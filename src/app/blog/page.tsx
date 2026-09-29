import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, PenLine, Rss } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import PostCard, { FeaturedPostCard } from '@/components/blog/PostCard'
import { listPosts, listCategories, POSTS_PER_PAGE } from '@/lib/blog/queries'
import type { PostType } from '@/lib/blog/shared'
import { SITE_URL, SITE_NAME } from '@/lib/site'

const DESCRIPTION =
  'Expert blogs and in-depth articles on marine and industrial coatings, corrosion protection and surface preparation from Clin Corp, Kenya\'s authorised Hempel distributor.'

interface Props {
  searchParams: Promise<{ type?: string; category?: string; page?: string }>
}

async function readParams(searchParams: Props['searchParams']) {
  const sp = await searchParams
  const type: PostType | undefined = sp.type === 'blog' || sp.type === 'article' ? sp.type : undefined
  const category = sp.category?.slice(0, 80) || undefined
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)
  return { type, category, page }
}

function buildHref(params: { type?: string; category?: string; page?: number }) {
  const q = new URLSearchParams()
  if (params.type) q.set('type', params.type)
  if (params.category) q.set('category', params.category)
  if (params.page && params.page > 1) q.set('page', String(params.page))
  const s = q.toString()
  return s ? `/blog?${s}` : '/blog'
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { type, category, page } = await readParams(searchParams)
  const heading = type === 'article' ? 'Articles' : type === 'blog' ? 'Blogs' : 'Blogs & Articles'
  const parts = [category ? `${category} ${heading}` : heading, page > 1 ? `Page ${page}` : null].filter(Boolean)
  const title = `${parts.join(' — ')} on Coatings & Corrosion Protection`
  return {
    title,
    description: DESCRIPTION,
    alternates: {
      canonical: buildHref({ type, category, page }),
      types: { 'application/rss+xml': `${SITE_URL}/blog/feed.xml` },
    },
    openGraph: {
      type: 'website',
      url: buildHref({ type, category, page }),
      title: `${heading} | ${SITE_NAME}`,
      description: DESCRIPTION,
      siteName: SITE_NAME,
      locale: 'en_KE',
    },
  }
}

const eyebrowStyle = {
  fontSize: 'clamp(9px, 2vw, 11px)',
  borderColor: 'rgba(245,166,35,0.35)',
  background: 'rgba(245,166,35,0.08)',
  color: '#F5A623',
  letterSpacing: '2px',
  fontFamily: 'var(--font-poppins)',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-150 cursor-pointer"
      style={{
        background: active ? '#1A2B5E' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#6B7A99',
        borderColor: active ? '#1A2B5E' : 'rgba(26,43,94,0.12)',
      }}
    >
      {children}
    </Link>
  )
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const { type, category, page } = await readParams(searchParams)
  const [{ posts, total }, categories] = await Promise.all([listPosts({ type, category, page }), listCategories()])
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE))
  const filtered = !!(type || category)

  // Lead with a featured post on the unfiltered first page.
  const featured = !filtered && page === 1 ? (posts.find((p) => p.is_featured) ?? posts[0]) : undefined
  const gridPosts = featured ? posts.filter((p) => p.id !== featured.id) : posts

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: `${SITE_NAME} Blogs & Articles`,
        description: DESCRIPTION,
        inLanguage: 'en-KE',
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          '@type': p.type === 'article' ? 'Article' : 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.published_at,
          dateModified: p.updated_at,
          ...(p.cover_image_url ? { image: p.cover_image_url } : {}),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Blogs & Articles', item: `${SITE_URL}/blog` },
        ],
      },
    ],
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: '#040D1A' }} className="text-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mb-6 cursor-pointer transition-colors hover:text-white" style={{ color: '#8899AE' }}>
              <ArrowLeft size={13} /> Guides
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border" style={eyebrowStyle}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5A623' }} />
                Insights
              </div>
            </div>
            <h1 className="font-sans font-black leading-[0.95]" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Blogs &amp; Articles
            </h1>
            <p className="font-sans text-sm sm:text-base mt-4 max-w-2xl leading-relaxed" style={{ color: '#8899AE' }}>
              Practical advice and in-depth reading on marine and industrial coatings, corrosion protection and
              application — from Clin Corp&apos;s technical team.
            </p>
          </div>
        </section>

        <section className="pb-20 sm:pb-28 min-h-[50vh]" style={{ background: '#FAFAF8' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            {/* Filters */}
            <nav aria-label="Filter posts" className="flex flex-col gap-3 mb-10">
              <div className="flex flex-wrap gap-2">
                <Chip href={buildHref({ category })} active={!type}>All</Chip>
                <Chip href={buildHref({ type: 'blog', category })} active={type === 'blog'}>Blogs</Chip>
                <Chip href={buildHref({ type: 'article', category })} active={type === 'article'}>Articles</Chip>
              </div>
              {categories.length > 1 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>Topic</span>
                  <Link
                    href={buildHref({ type })}
                    className="text-sm font-semibold cursor-pointer transition-colors hover:text-blue"
                    style={{ color: !category ? '#0070C0' : '#6B7A99' }}
                  >
                    All topics
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c}
                      href={buildHref({ type, category: c })}
                      aria-current={category === c ? 'page' : undefined}
                      className="text-sm font-semibold cursor-pointer transition-colors hover:text-blue"
                      style={{ color: category === c ? '#0070C0' : '#6B7A99' }}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </nav>

            {posts.length === 0 ? (
              <div className="rounded-2xl border bg-white px-6 py-16 text-center" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,166,35,0.10)' }}>
                  <PenLine size={18} style={{ color: '#F5A623' }} />
                </div>
                <p className="font-sans font-black text-lg" style={{ color: '#1A2B5E' }}>
                  {filtered ? 'Nothing here yet' : 'Our first posts are on the way'}
                </p>
                <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: '#6B7A99' }}>
                  {filtered
                    ? 'No posts match this filter yet. Try another topic, or browse everything.'
                    : 'In the meantime, our technical guides cover Hempel coating systems in depth.'}
                </p>
                <Link
                  href={filtered ? '/blog' : '/guides'}
                  className="inline-flex items-center gap-1.5 mt-5 text-xs font-black uppercase tracking-widest cursor-pointer"
                  style={{ color: '#0070C0' }}
                >
                  {filtered ? 'View all posts' : 'Browse guides'} <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <>
                {featured && (
                  <div className="mb-8">
                    <FeaturedPostCard post={featured} />
                  </div>
                )}
                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <nav aria-label="Pagination" className="flex items-center justify-between gap-4 mt-12">
                    {page > 1 ? (
                      <Link href={buildHref({ type, category, page: page - 1 })} rel="prev" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest cursor-pointer" style={{ color: '#0070C0' }}>
                        <ArrowLeft size={13} /> Newer
                      </Link>
                    ) : <span />}
                    <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: '#8899AE' }}>
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages ? (
                      <Link href={buildHref({ type, category, page: page + 1 })} rel="next" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest cursor-pointer" style={{ color: '#0070C0' }}>
                        Older <ArrowRight size={13} />
                      </Link>
                    ) : <span />}
                  </nav>
                )}
              </>
            )}

            <div className="mt-14 flex justify-center">
              <a href="/blog/feed.xml" className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors hover:text-gold" style={{ color: '#8899AE' }}>
                <Rss size={12} /> RSS feed
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
