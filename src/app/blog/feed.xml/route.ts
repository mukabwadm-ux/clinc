import { listAllLivePosts } from '@/lib/blog/queries'
import { SITE_URL, SITE_NAME } from '@/lib/site'

export const revalidate = 600

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function GET() {
  const posts = (await listAllLivePosts()).slice(0, 50)

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published_at ?? p.updated_at).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>${p.cover_image_url ? `
      <enclosure url="${esc(p.cover_image_url)}" type="image/${/\.png(\?|$)/i.test(p.cover_image_url) ? 'png' : /\.webp(\?|$)/i.test(p.cover_image_url) ? 'webp' : 'jpeg'}" length="0" />` : ''}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} — Blogs &amp; Articles</title>
    <link>${SITE_URL}/blog</link>
    <description>Marine and industrial coatings insights from Clin Corp, Kenya's authorised Hempel distributor.</description>
    <language>en-KE</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />${posts[0] ? `
    <lastBuildDate>${new Date(posts[0].updated_at).toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
