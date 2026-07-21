import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { productSchema, uuidSchema } from '@/lib/adminValidation'

type Ctx = { params: Promise<{ id: string }> }

async function resolveId(params: Ctx['params']) {
  const { id } = await params
  const parsed = uuidSchema.safeParse(id)
  return parsed.success ? id : null
}

export async function GET(_req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).single()
  if (error || !data) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return NextResponse.json({ error: firstError?.message ?? 'Validation failed' }, { status: 422 })
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const msg = error.code === '23505' ? 'A product with this slug already exists' : 'Failed to update product'
    return NextResponse.json({ error: msg }, { status: error.code === '23505' ? 409 : 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) {
    console.error('[admin/products DELETE]', error.code)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
