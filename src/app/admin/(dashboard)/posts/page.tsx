import { Plus, Database } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { POST_TYPE_LABEL, analyzeSeo, formatDate, scoreColor, type Post } from '@/lib/blog/shared'
import PostActions from './_components/PostActions'

export const dynamic = 'force-dynamic'

type Filter = 'all' | 'published' | 'scheduled' | 'draft'

// Rendered per request (force-dynamic), so reading the clock here is stable.
function requestTime() {
  return Date.now()
}

function stateOf(p: Pick<Post, 'status' | 'published_at'>, now: number): Exclude<Filter, 'all'> {
  if (p.status === 'draft') return 'draft'
  return p.published_at && new Date(p.published_at).getTime() > now ? 'scheduled' : 'published'
}

const STATE_STYLE = {
  published: { label: 'Published', bg: 'rgba(16,185,129,0.10)', color: '#059669' },
  scheduled: { label: 'Scheduled', bg: 'rgba(0,112,192,0.10)', color: '#0070C0' },
  draft: { label: 'Draft', bg: 'rgba(107,122,153,0.12)', color: '#6B7A99' },
} as const

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter: rawFilter } = await searchParams
  const filter: Filter = ['published', 'scheduled', 'draft'].includes(rawFilter ?? '') ? (rawFilter as Filter) : 'all'

  const { data, error } = await supabaseAdmin.from('posts').select('*').order('updated_at', { ascending: false })

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.12)' }}>
            <Database size={18} style={{ color: '#B45309' }} />
          </div>
          <div>
            <p className="font-black" style={{ color: '#1A2B5E' }}>The blog isn&apos;t set up in the database yet</p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#6B7A99' }}>
              Run <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: '#F1F5F9' }}>supabase/migrations/20260929_create_posts.sql</span> in
              the Supabase SQL editor, then reload this page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const now = requestTime()
  const all = ((data ?? []) as Post[]).map(p => ({
    ...p,
    state: stateOf(p, now),
    score: analyzeSeo({
      title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content,
      metaTitle: p.meta_title || `${p.title} | Clin Corp Kenya`, metaDescription: p.meta_description ?? '',
      focusKeyword: p.focus_keyword ?? '', coverImageUrl: p.cover_image_url ?? '', coverImageAlt: p.cover_image_alt ?? '',
      faqCount: Array.isArray(p.faqs) ? p.faqs.length : 0,
    }).score,
  }))
  const counts = {
    all: all.length,
    published: all.filter(p => p.state === 'published').length,
    scheduled: all.filter(p => p.state === 'scheduled').length,
    draft: all.filter(p => p.state === 'draft').length,
  }
  const posts = filter === 'all' ? all : all.filter(p => p.state === filter)

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'published', label: 'Published' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'draft', label: 'Drafts' },
  ]

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map(t => (
            <a key={t.key} href={t.key === 'all' ? '/admin/posts' : `/admin/posts?filter=${t.key}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer"
              style={{
                background: filter === t.key ? '#F5A623' : 'white',
                color: filter === t.key ? '#0D1B4B' : '#6B7A99',
                borderColor: filter === t.key ? '#F5A623' : 'rgba(26,43,94,0.12)',
              }}>
              {t.label} <span className="font-mono text-[10px] opacity-70">{counts[t.key]}</span>
            </a>
          ))}
        </div>
        <a href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:brightness-110 cursor-pointer shrink-0"
          style={{ background: '#F5A623', color: '#0D1B4B' }}>
          <Plus size={15} /> New Post
        </a>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-sans text-sm" style={{ color: '#6B7A99' }}>{filter === 'all' ? 'No posts yet.' : `No ${tabs.find(t => t.key === filter)?.label.toLowerCase()} posts.`}</p>
            <a href="/admin/posts/new" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold" style={{ color: '#0070C0' }}>
              <Plus size={14} /> Write your first post
            </a>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(26,43,94,0.07)', background: '#F8F9FB' }}>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Post</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest hidden md:table-cell" style={{ color: '#6B7A99' }}>Type</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Status</th>
                <th className="text-center px-4 py-3 font-mono text-[10px] uppercase tracking-widest hidden sm:table-cell" style={{ color: '#6B7A99' }}>SEO</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest hidden lg:table-cell" style={{ color: '#6B7A99' }}>Date</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => {
                const st = STATE_STYLE[p.state]
                return (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
                    <td className="px-5 py-3.5 max-w-[360px]">
                      <a href={`/admin/posts/${p.id}/edit`} className="font-sans font-semibold hover:underline cursor-pointer line-clamp-2" style={{ color: '#1A2B5E' }}>{p.title}</a>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: '#9CAABB' }}>
                        {p.category}{p.focus_keyword ? <> · <span style={{ color: '#B45309' }}>“{p.focus_keyword}”</span></> : null}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: p.type === 'article' ? 'rgba(0,112,192,0.10)' : 'rgba(245,166,35,0.10)', color: p.type === 'article' ? '#0070C0' : '#B45309' }}>
                        {POST_TYPE_LABEL[p.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap" style={{ background: st.bg, color: st.color }}>
                        {st.label}
                      </span>
                      {p.noindex && <span className="block text-[10px] mt-1" style={{ color: '#EF4444' }}>noindex</span>}
                    </td>
                    <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                      <span className="font-mono text-xs font-bold" style={{ color: scoreColor(p.score) }}>{p.score}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell whitespace-nowrap text-xs" style={{ color: '#6B7A99' }}>
                      {p.state === 'draft' ? `Edited ${formatDate(p.updated_at)}` : formatDate(p.published_at)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <PostActions id={p.id} liveSlug={p.state === 'published' ? p.slug : null} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
