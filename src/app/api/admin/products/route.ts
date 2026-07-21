import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { productSchema } from '@/lib/adminValidation'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[admin/products GET]', error.code)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return NextResponse.json({ error: firstError?.message ?? 'Validation failed' }, { status: 422 })
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([parsed.data])
    .select()
    .single()

  if (error) {
    const msg = error.code === '23505' ? 'A product with this slug already exists' : 'Failed to create product'
    return NextResponse.json({ error: msg }, { status: error.code === '23505' ? 409 : 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
