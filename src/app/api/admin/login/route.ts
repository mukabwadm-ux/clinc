import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { createHash, timingSafeEqual } from 'crypto'
import { checkRateLimit, clearRateLimit } from '@/lib/rateLimit'
import { loginSchema } from '@/lib/adminValidation'

function safeCompare(a: string, b: string): boolean {
  // Hash both to equalise length before timing-safe comparison
  const aHash = createHash('sha256').update(a).digest()
  const bHash = createHash('sha256').update(b).digest()
  return timingSafeEqual(aHash, bHash)
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed, retryAfter } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    // Return generic message — do not leak which field failed
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const { email, password } = parsed.data
  const validEmail = process.env.ADMIN_EMAIL ?? ''
  const validPassword = process.env.ADMIN_PASSWORD ?? ''

  // Always run both comparisons (prevent short-circuit timing leak)
  const emailOk = safeCompare(email, validEmail)
  const passOk = safeCompare(password, validPassword)

  if (!emailOk || !passOk) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  clearRateLimit(`login:${ip}`)

  const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return res
}
