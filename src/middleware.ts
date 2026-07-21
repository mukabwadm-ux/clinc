import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isAdminAPI = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminAPI) return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value

  if (!token) {
    if (isAdminAPI) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    if (isAdminAPI) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const res = NextResponse.redirect(new URL('/admin/login', request.url))
    res.cookies.delete('admin_token')
    return res
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
