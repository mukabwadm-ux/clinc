import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = form.get('file') as File | null
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only PDF and Word documents (.pdf, .doc, .docx) are allowed' }, { status: 422 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 422 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
  const path = `documents/${Date.now()}-${safeName}`
  const buffer = await file.arrayBuffer()

  const { data, error } = await supabaseAdmin.storage
    .from('product-documents')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (error) {
    console.error('[upload]', error.message)
    return NextResponse.json(
      { error: 'Upload failed. Make sure the "product-documents" bucket exists in Supabase Storage.' },
      { status: 500 }
    )
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('product-documents')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
