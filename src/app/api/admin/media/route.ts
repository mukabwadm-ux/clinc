import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { uuidSchema } from '@/lib/adminValidation'
import { z } from 'zod'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const bucket = searchParams.get('bucket') ?? 'product-images'

  const { data, error } = await supabaseAdmin
    .from('media_library')
    .select('*')
    .eq('bucket', bucket)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'Failed to load media' }, { status: 500 })
  return NextResponse.json(data ?? [])
}

const deleteSchema = z.object({
  items: z.array(z.object({
    id: uuidSchema,
    path: z.string().min(1),
    bucket: z.string().min(1),
  })).min(1),
})

export async function DELETE(req: Request) {
  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const parsed = deleteSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 422 })

  const errors: string[] = []

  for (const item of parsed.data.items) {
    const { error: storageErr } = await supabaseAdmin.storage
      .from(item.bucket)
      .remove([item.path])
    if (storageErr) errors.push(item.path)

    await supabaseAdmin.from('media_library').delete().eq('id', item.id)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: `Failed to delete: ${errors.join(', ')}` }, { status: 207 })
  }
  return NextResponse.json({ success: true })
}
