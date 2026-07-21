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
        image_url: data.image_url ?? '',
        slug: data.slug ?? '',
        is_active: data.is_active,
        sort_order: data.sort_order ?? 0,
        product_data_sheet_url: data.product_data_sheet_url ?? '',
        safety_data_sheet_url: data.safety_data_sheet_url ?? '',
        application_instruction_url: data.application_instruction_url ?? '',
      }}
    />
  )
}
