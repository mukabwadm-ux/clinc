import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { GUIDES } from '@/lib/guides/guides'

/** Pages offered as one-click internal link targets in the post editor. */
export async function getInternalLinks(excludePostId?: string) {
  const [{ data: products }, { data: posts }] = await Promise.all([
    supabaseAdmin.from('products').select('name, slug').eq('is_active', true).not('slug', 'is', null).order('name'),
    supabaseAdmin.from('posts').select('id, title, slug').eq('status', 'published').order('published_at', { ascending: false }).limit(200),
  ])

  return [
    { label: 'Products', href: '/products' },
    { label: 'Paint Calculator', href: '/paint-calculator' },
    { label: 'Contact / Get a quote', href: '/contact' },
    { label: 'Case Stories', href: '/case-stories' },
    { label: 'About Clin Corp', href: '/about' },
    ...GUIDES.map(g => ({ label: `Guide: ${g.title}`, href: `/guides/${g.slug}` })),
    ...(products ?? []).map(p => ({ label: `Product: ${p.name}`, href: `/products/${p.slug}` })),
    ...(posts ?? []).filter(p => p.id !== excludePostId).map(p => ({ label: `Post: ${p.title}`, href: `/blog/${p.slug}` })),
  ]
}
