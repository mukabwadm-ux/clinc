import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { notFound } from 'next/navigation'
import ProductForm from '../../_components/ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).single()

  if (error || !data) notFound()

  return (
    <ProductForm
      productId={id}
      initial={{
        name: data.name,
        code: data.code ?? '',
        tag: data.tag,
        category: data.category,
        description: data.description,
        images: Array.isArray(data.images) ? data.images : [],
        slug: data.slug ?? '',
        is_active: data.is_active,
        is_featured: data.is_featured ?? false,
        featured_image_url: data.featured_image_url ?? '',
        featured_image_alt: data.featured_image_alt ?? '',
        sort_order: data.sort_order ?? 0,
        product_data_sheet_url: data.product_data_sheet_url ?? '',
        safety_data_sheet_url: data.safety_data_sheet_url ?? '',
        application_instruction_url: data.application_instruction_url ?? '',
      }}
    />
  )
}
