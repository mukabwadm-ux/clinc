import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { listAllLivePosts } from '@/lib/blog/queries'

// Regenerated when posts are saved (see revalidatePost) and at least hourly.
export const revalidate = 3600

const routes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/products', priority: 0.9 },
  { path: '/paint-calculator', priority: 0.7 },
  { path: '/leadership', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/case-stories', priority: 0.7 },
  { path: '/guides', priority: 0.7 },
  { path: '/guides/marine-paint-systems', priority: 0.6 },
  { path: '/blog', priority: 0.8 },
  { path: '/contact', priority: 0.6 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const posts = await listAllLivePosts()

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: path === '/blog' && posts[0] ? new Date(posts[0].updated_at) : lastModified,
      changeFrequency: path === '/blog' ? ('weekly' as const) : ('monthly' as const),
      priority,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...(p.cover_image_url ? { images: [p.cover_image_url] } : {}),
    })),
  ]
}
