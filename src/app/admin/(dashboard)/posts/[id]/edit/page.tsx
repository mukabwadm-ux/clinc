import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { uuidSchema } from '@/lib/adminValidation'
import type { Post } from '@/lib/blog/shared'
import PostForm, { isoToLocalInput } from '../../_components/PostForm'
import { getInternalLinks } from '../../_components/internalLinks'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!uuidSchema.safeParse(id).success) notFound()

  const [{ data, error }, internalLinks] = await Promise.all([
    supabaseAdmin.from('posts').select('*').eq('id', id).single(),
    getInternalLinks(id),
  ])
  if (error || !data) notFound()
  const post = data as Post

  const isLive = post.status === 'published' && !!post.published_at && new Date(post.published_at) <= new Date()

  return (
    <PostForm
      postId={id}
      liveSlug={isLive ? post.slug : null}
      internalLinks={internalLinks}
      initial={{
        type: post.type,
        status: post.status,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        content: post.content ?? '',
        category: post.category,
        tags: post.tags ?? [],
        author_name: post.author_name,
        cover_image_url: post.cover_image_url ?? '',
        cover_image_alt: post.cover_image_alt ?? '',
        meta_title: post.meta_title ?? '',
        meta_description: post.meta_description ?? '',
        focus_keyword: post.focus_keyword ?? '',
        canonical_url: post.canonical_url ?? '',
        noindex: post.noindex,
        is_featured: post.is_featured,
        faqs: Array.isArray(post.faqs) ? post.faqs : [],
        published_at: isoToLocalInput(post.published_at),
      }}
    />
  )
}
