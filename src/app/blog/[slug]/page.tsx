import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock, CalendarDays, ListTree, MessageSquareQuote, UserRound } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import PostCard from '@/components/blog/PostCard'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog/queries'
import {
  POST_TYPE_LABEL, effectiveDescription, effectiveTitle, formatDate, withHeadingAnchors, wordCount,
} from '@/lib/blog/shared'
import { SITE_URL, SITE_NAME } from '@/lib/site'

// Cached and refreshed on demand when a post is saved in the admin, with a
// periodic refresh so scheduled posts go live on time.
export const revalidate = 600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found', robots: { index: false } }

  const description = effectiveDescription(post)
  const url = `/blog/${post.slug}`
  const images = post.cover_image_url
    ? [{ url: post.cover_image_url, alt: post.cover_image_alt || post.title }]
    : [{ url: '/clincorp_logo.png', alt: SITE_NAME }]

  return {
    // A hand-written SEO title is used exactly; otherwise the site suffix is added.
    title: post.meta_title ? { absolute: post.meta_title } : post.title,
    description,
    keywords: [post.focus_keyword, ...post.tags].filter((k): k is string => !!k),
    authors: [{ name: post.author_name }],
    category: post.category,
    alternates: {
      canonical: post.canonical_url || url,
      types: { 'application/rss+xml': `${SITE_URL}/blog/feed.xml` },
    },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      locale: 'en_KE',
      title: effectiveTitle(post),
      description,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      section: post.category,
      tags: post.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: effectiveTitle(post),
      description,
      images: images.map((i) => i.url),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const { html, toc } = withHeadingAnchors(post.content)
  const related = await getRelatedPosts(post)
  const url = `${SITE_URL}/blog/${post.slug}`
  const faqs = Array.isArray(post.faqs) ? post.faqs.filter((f) => f.question && f.answer) : []
  const wasUpdated = post.published_at && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86_400_000

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': post.type === 'article' ? 'Article' : 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title,
        description: effectiveDescription(post),
        ...(post.cover_image_url ? { image: [post.cover_image_url] } : {}),
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { '@type': 'Organization', name: post.author_name, url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization` },
        articleSection: post.category,
        keywords: [post.focus_keyword, ...post.tags].filter(Boolean).join(', '),
        wordCount: wordCount(post.content),
        timeRequired: `PT${post.reading_minutes}M`,
        inLanguage: 'en-KE',
        isPartOf: { '@id': `${SITE_URL}/blog#blog` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blogs & Articles', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      ...(faqs.length
        ? [{
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }]
        : []),
    ],
  }

  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(url)
  const shares = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${shareText}%20${shareUrl}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}` },
  ]

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <main style={{ background: '#040D1A' }} className="text-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans flex-wrap mb-6" style={{ color: '#8899AE' }}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide cursor-pointer transition-colors hover:text-white">
                <ArrowLeft size={13} /> Blogs &amp; Articles
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="cursor-pointer transition-colors hover:text-white">
                {post.category}
              </Link>
            </nav>
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-5"
              style={{
                fontSize: 'clamp(9px, 2vw, 11px)',
                borderColor: 'rgba(245,166,35,0.35)',
                background: 'rgba(245,166,35,0.08)',
                color: '#F5A623',
                letterSpacing: '2px',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5A623' }} />
              {POST_TYPE_LABEL[post.type]} · {post.category}
            </div>
            <h1 className="font-sans font-black leading-[1.05]" style={{ fontSize: 'clamp(28px, 4.5vw, 50px)' }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-sans text-base sm:text-lg mt-5 max-w-3xl leading-relaxed" style={{ color: '#8899AE' }}>
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 text-xs sm:text-sm" style={{ color: '#8899AE' }}>
              <span className="inline-flex items-center gap-1.5"><UserRound size={14} style={{ color: '#F5A623' }} /> {post.author_name}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} style={{ color: '#F5A623' }} />
                <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
              </span>
              {wasUpdated && (
                <span>
                  Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5"><Clock size={14} style={{ color: '#F5A623' }} /> {post.reading_minutes} min read</span>
            </div>
          </div>
        </section>

        <section className="relative pb-20 sm:pb-24" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0, #00D4B4)' }} />

          {post.cover_image_url && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(26,43,94,0.08)' }}>
                <Image
                  src={post.cover_image_url}
                  alt={post.cover_image_alt || post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 976px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-14">
              <div className="min-w-0 max-w-[720px] w-full mx-auto lg:mx-0">
                {/* Mobile table of contents */}
                {toc.length >= 3 && (
                  <details className="lg:hidden rounded-2xl border bg-white mb-8 group" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                    <summary className="flex items-center gap-2 px-5 py-4 cursor-pointer font-sans font-black text-sm list-none" style={{ color: '#1A2B5E' }}>
                      <ListTree size={15} style={{ color: '#F5A623' }} /> In this {post.type === 'article' ? 'article' : 'post'}
                    </summary>
                    <TocList toc={toc} />
                  </details>
                )}

                <article className="post-body" dangerouslySetInnerHTML={{ __html: html }} />

                {/* FAQs */}
                {faqs.length > 0 && (
                  <section aria-labelledby="faq-heading" className="mt-14">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                      <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>FAQ</p>
                    </div>
                    <h2 id="faq-heading" className="font-sans font-black leading-tight mb-6" style={{ fontSize: 'clamp(22px, 2.6vw, 28px)', color: '#1A2B5E' }}>
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {faqs.map((f, i) => (
                        <details key={i} className="group rounded-2xl border bg-white" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                          <summary className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none font-sans font-bold text-[15px]" style={{ color: '#1A2B5E' }}>
                            {f.question}
                            <span className="shrink-0 mt-0.5 text-lg leading-none transition-transform group-open:rotate-45" style={{ color: '#F5A623' }} aria-hidden="true">+</span>
                          </summary>
                          <p className="px-5 sm:px-6 pb-5 text-[15px] leading-relaxed" style={{ color: '#3D4B6B' }}>{f.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                {/* Tags + share */}
                <div className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                  {post.tags.length > 0 ? (
                    <ul className="flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((t) => (
                        <li key={t} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(26,43,94,0.06)', color: '#1A2B5E' }}>
                          #{t}
                        </li>
                      ))}
                    </ul>
                  ) : <span />}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest mr-1" style={{ color: '#8899AE' }}>Share</span>
                    {shares.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${s.label}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors hover:border-gold/50"
                        style={{ borderColor: 'rgba(26,43,94,0.12)', color: '#1A2B5E' }}
                      >
                        {s.label === 'LinkedIn' && <LinkedInIcon size={12} />}
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-5">
                  {toc.length >= 2 && (
                    <nav aria-label="Table of contents" className="rounded-2xl border bg-white py-2" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                      <p className="flex items-center gap-2 px-5 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[2px]" style={{ color: '#8899AE' }}>
                        <ListTree size={12} /> Contents
                      </p>
                      <TocList toc={toc} />
                    </nav>
                  )}
                  <CtaCard />
                </div>
              </aside>
            </div>

            <div className="lg:hidden mt-12 max-w-[720px] mx-auto">
              <CtaCard />
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 sm:py-20 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }} />
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Keep Reading</p>
                  </div>
                  <h2 className="font-sans font-black" style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>Related Posts</h2>
                </div>
                <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest cursor-pointer" style={{ color: '#F5A623' }}>
                  All posts <ArrowRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => <PostCard key={p.id} post={p} headingLevel="h3" />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

function TocList({ toc }: { toc: { id: string; text: string; level: 2 | 3 }[] }) {
  return (
    <ol className="px-2 pb-3">
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block rounded-lg py-1.5 pr-3 text-[13px] leading-snug cursor-pointer transition-colors hover:bg-slate-50 hover:text-blue ${item.level === 3 ? 'pl-7' : 'pl-3 font-semibold'}`}
            style={{ color: item.level === 3 ? '#6B7A99' : '#1A2B5E' }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  )
}

function CtaCard() {
  return (
    <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1B45 0%, #040D1A 100%)' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,166,35,0.12)' }}>
        <MessageSquareQuote size={16} style={{ color: '#F5A623' }} />
      </div>
      <p className="font-sans font-black text-white text-base leading-snug">Need the right coating system?</p>
      <p className="font-sans text-sm mt-2 leading-relaxed" style={{ color: '#8899AE' }}>
        Our technical team specifies Hempel systems for marine and industrial projects across East Africa.
      </p>
      <div className="flex flex-col gap-2 mt-5">
        <Link href="/contact" className="inline-flex items-center justify-center font-sans bg-gold text-navy rounded-lg px-4 py-2.5 text-xs font-black tracking-widest uppercase hover:brightness-110 transition-all cursor-pointer">
          Get a Quote
        </Link>
        <Link href="/products" className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer">
          Browse Products <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}

