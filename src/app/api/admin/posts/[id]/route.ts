import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { postSchema, uuidSchema } from '@/lib/adminValidation'
import { toPostRow, revalidatePost } from '../shared'

type Ctx = { params: Promise<{ id: string }> }

async function resolveId(params: Ctx['params']) {
  const { id } = await params
  const parsed = uuidSchema.safeParse(id)
  return parsed.success ? id : null
}

export async function GET(_req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { data, error } = await supabaseAdmin.from('posts').select('*').eq('id', id).single()
  if (error || !data) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return NextResponse.json({ error: firstError?.message ?? 'Validation failed' }, { status: 422 })
  }

  // Needed to purge the old URL if the slug changed.
  const { data: previous } = await supabaseAdmin.from('posts').select('slug').eq('id', id).single()

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({ ...toPostRow(parsed.data), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const msg = error.code === '23505' ? 'A post with this slug already exists' : 'Failed to update post'
    if (error.code !== '23505') console.error('[admin/posts PUT]', error.code, error.message)
    return NextResponse.json({ error: msg }, { status: error.code === '23505' ? 409 : 500 })
  }

  revalidatePost(data.slug, previous?.slug)
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { data, error } = await supabaseAdmin.from('posts').delete().eq('id', id).select('slug').single()
  if (error) {
    console.error('[admin/posts DELETE]', error.code)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
  revalidatePost(data?.slug)
  return NextResponse.json({ success: true })
}
