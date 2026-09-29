import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { postSchema } from '@/lib/adminValidation'
import { toPostRow, revalidatePost } from './shared'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, type, status, title, slug, category, focus_keyword, published_at, updated_at, is_featured')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('[admin/posts GET]', error.code)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
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

  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return NextResponse.json({ error: firstError?.message ?? 'Validation failed' }, { status: 422 })
  }

  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert([toPostRow(parsed.data)])
    .select()
    .single()

  if (error) {
    const msg = error.code === '23505' ? 'A post with this slug already exists' : 'Failed to create post'
    if (error.code !== '23505') console.error('[admin/posts POST]', error.code, error.message)
    return NextResponse.json({ error: msg }, { status: error.code === '23505' ? 409 : 500 })
  }

  revalidatePost(data.slug)
  return NextResponse.json(data, { status: 201 })
}
