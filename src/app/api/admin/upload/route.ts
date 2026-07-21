import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
const DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const IMAGE_MAX = 500 * 1024        // 500 KB
const DOC_MAX   = 10 * 1024 * 1024 // 10 MB

export async function POST(req: Request) {
  let form: FormData
  try { form = await req.formData() } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file   = form.get('file')   as File   | null
  const alt    = form.get('alt')    as string | null
  const bucket = (form.get('bucket') as string | null) ?? 'product-documents'

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const isImage = IMAGE_TYPES.includes(file.type)
  const isDoc   = DOC_TYPES.includes(file.type)

  if (!isImage && !isDoc) {
    return NextResponse.json(
      { error: 'Unsupported file type. Use JPEG, PNG, WEBP, PDF, DOC or DOCX.' },
      { status: 422 }
    )
  }
  if (isImage && file.size > IMAGE_MAX) {
    return NextResponse.json({ error: 'Image must be under 500 KB' }, { status: 422 })
  }
  if (isDoc && file.size > DOC_MAX) {
    return NextResponse.json({ error: 'Document must be under 10 MB' }, { status: 422 })
  }
  if (isImage && (!alt || alt.trim() === '')) {
    return NextResponse.json({ error: 'Alt text is required for images' }, { status: 422 })
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
  const folder   = isImage ? 'images' : 'documents'
  const path     = `${folder}/${Date.now()}-${safeName}`
  const buffer   = await file.arrayBuffer()

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (error) {
    console.error('[upload]', error.message)
    return NextResponse.json(
      { error: `Upload failed. Check the "${bucket}" bucket exists in Supabase Storage.` },
      { status: 500 }
    )
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(data.path)

  // Track in media_library
  await supabaseAdmin.from('media_library').insert({
    path: data.path,
    url: publicUrl,
    alt: alt?.trim() || null,
    bucket,
    file_size: file.size,
    mime_type: file.type,
  })

  return NextResponse.json({ url: publicUrl, path: data.path })
}
