import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { contactPatchSchema, uuidSchema } from '@/lib/adminValidation'

type Ctx = { params: Promise<{ id: string }> }

async function resolveId(params: Ctx['params']) {
  const { id } = await params
  const parsed = uuidSchema.safeParse(id)
  return parsed.success ? id : null
}

export async function PATCH(req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactPatchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 422 })
  }

  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ is_read: parsed.data.is_read })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const id = await resolveId(params)
  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  return NextResponse.json({ success: true })
}
