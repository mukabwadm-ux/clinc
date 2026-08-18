import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const routes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/products', priority: 0.9 },
  { path: '/paint-calculator', priority: 0.7 },
  { path: '/guides', priority: 0.7 },
  { path: '/guides/marine-paint-systems', priority: 0.6 },
  { path: '/leadership', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/case-stories', priority: 0.7 },
  { path: '/contact', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }))
}
