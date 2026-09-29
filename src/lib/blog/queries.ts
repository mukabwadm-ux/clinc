import { supabase } from '@/lib/supabase'
import { POST_CARD_COLUMNS, type Post, type PostCard, type PostType } from './shared'

// Public reads go through the anon key, so RLS guarantees only live posts
// (published, publish date reached) are ever returned. The explicit filters
// below repeat that so behaviour doesn't depend on the policy alone.

const now = () => new Date().toISOString()

function livePosts(columns: string, count?: 'exact') {
  return supabase
    .from('posts')
    .select(columns, count ? { count } : undefined)
    .eq('status', 'published')
    .lte('published_at', now())
}

export const POSTS_PER_PAGE = 9

export async function listPosts(opts: { type?: PostType; category?: string; page?: number } = {}) {
  const page = Math.max(1, opts.page ?? 1)
  const from = (page - 1) * POSTS_PER_PAGE

  try {
    let q = livePosts(POST_CARD_COLUMNS, 'exact')
    if (opts.type) q = q.eq('type', opts.type)
    if (opts.category) q = q.eq('category', opts.category)
    const { data, count, error } = await q
      .order('published_at', { ascending: false })
      .range(from, from + POSTS_PER_PAGE - 1)
    if (error) throw error
    return { posts: (data ?? []) as unknown as PostCard[], total: count ?? 0 }
  } catch (err) {
    console.error('[blog] listPosts failed', err)
    return { posts: [] as PostCard[], total: 0 }
  }
}

export async function listCategories(): Promise<string[]> {
  try {
    const { data } = await livePosts('category')
    const rows = (data ?? []) as unknown as { category: string }[]
    return [...new Set(rows.map((r) => r.category))].sort()
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await livePosts('*').eq('slug', slug).maybeSingle()
    return (data as unknown as Post) ?? null
  } catch (err) {
    console.error('[blog] getPostBySlug failed', err)
    return null
  }
}

/** Same category first, then most recent — keeps readers (and crawlers) moving through the site. */
export async function getRelatedPosts(post: Pick<Post, 'id' | 'category'>, limit = 3): Promise<PostCard[]> {
  try {
    const { data: same } = await livePosts(POST_CARD_COLUMNS)
      .eq('category', post.category)
      .neq('id', post.id)
      .order('published_at', { ascending: false })
      .limit(limit)
    const related = (same ?? []) as unknown as PostCard[]
    if (related.length >= limit) return related

    const exclude = [post.id, ...related.map((p) => p.id)]
    const { data: recent } = await livePosts(POST_CARD_COLUMNS)
      .not('id', 'in', `(${exclude.join(',')})`)
      .order('published_at', { ascending: false })
      .limit(limit - related.length)
    return [...related, ...((recent ?? []) as unknown as PostCard[])]
  } catch {
    return []
  }
}

/** Every indexable live post — for the sitemap and RSS feed. */
export async function listAllLivePosts(): Promise<PostCard[]> {
  try {
    const { data } = await livePosts(POST_CARD_COLUMNS)
      .eq('noindex', false)
      .order('published_at', { ascending: false })
      .limit(5000)
    return (data ?? []) as unknown as PostCard[]
  } catch {
    return []
  }
}
