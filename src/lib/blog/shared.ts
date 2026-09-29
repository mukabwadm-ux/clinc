// Blog helpers that are safe to import from both server and client code.

export type PostType = 'blog' | 'article'
export type PostStatus = 'draft' | 'published'

export interface PostFaq {
  question: string
  answer: string
}

export interface Post {
  id: string
  type: PostType
  status: PostStatus
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author_name: string
  cover_image_url: string | null
  cover_image_alt: string | null
  meta_title: string | null
  meta_description: string | null
  focus_keyword: string | null
  canonical_url: string | null
  noindex: boolean
  faqs: PostFaq[]
  reading_minutes: number
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

/** Columns needed to render a post card — keeps listing queries light. */
export const POST_CARD_COLUMNS =
  'id, type, title, slug, excerpt, category, tags, author_name, cover_image_url, cover_image_alt, reading_minutes, is_featured, published_at, updated_at'

export type PostCard = Pick<
  Post,
  | 'id' | 'type' | 'title' | 'slug' | 'excerpt' | 'category' | 'tags' | 'author_name'
  | 'cover_image_url' | 'cover_image_alt' | 'reading_minutes' | 'is_featured' | 'published_at' | 'updated_at'
>

export const POST_TYPE_LABEL: Record<PostType, string> = {
  blog: 'Blog',
  article: 'Article',
}

export const POST_CATEGORIES = [
  'Marine Coatings',
  'Industrial Coatings',
  'Corrosion Protection',
  'Surface Preparation',
  'Application Tips',
  'Industry News',
  'Case Insights',
  'General',
]

export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 160

// ── Text helpers ─────────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function wordCount(html: string): number {
  const text = stripHtml(html)
  return text ? text.split(' ').length : 0
}

export function readingMinutes(html: string): number {
  return Math.max(1, Math.ceil(wordCount(html) / 220))
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : cut.length).trim()}…`
}

/** The description search engines see: meta description → excerpt → opening text. */
export function effectiveDescription(p: Pick<Post, 'meta_description' | 'excerpt' | 'content'>): string {
  return (p.meta_description?.trim() || p.excerpt?.trim() || truncate(stripHtml(p.content), DESCRIPTION_MAX))
}

export function effectiveTitle(p: Pick<Post, 'meta_title' | 'title'>): string {
  return p.meta_title?.trim() || p.title
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Headings / table of contents ─────────────────────────────────────────────

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Gives every h2/h3 a stable id (so headings are linkable and can appear as
 * jump links in search results) and returns the table of contents.
 */
export function withHeadingAnchors(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const used = new Set<string>()

  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, lvl: string, attrs: string, inner: string) => {
    const text = stripHtml(inner)
    if (!text) return match
    const existing = attrs.match(/\sid="([^"]+)"/i)?.[1]
    let id = existing || slugify(text) || 'section'
    if (!existing) {
      const base = id
      let n = 2
      while (used.has(id)) id = `${base}-${n++}`
    }
    used.add(id)
    toc.push({ id, text, level: Number(lvl) as 2 | 3 })
    return existing ? match : `<h${lvl}${attrs} id="${id}">${inner}</h${lvl}>`
  })

  return { html: out, toc }
}

// ── SEO analysis ─────────────────────────────────────────────────────────────

export type CheckStatus = 'good' | 'warn' | 'bad'

export interface SeoCheck {
  id: string
  label: string
  status: CheckStatus
  tip?: string
}

export interface SeoInput {
  title: string
  slug: string
  excerpt: string
  content: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  coverImageUrl: string
  coverImageAlt: string
  faqCount: number
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function containsKeyword(text: string, keyword: string): boolean {
  if (!keyword) return false
  return new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'i').test(text)
}

function countKeyword(text: string, keyword: string): number {
  if (!keyword) return 0
  return (text.match(new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi')) ?? []).length
}

const INTERNAL_HOSTS = /^(\/(?!\/)|#|https?:\/\/(www\.)?clincorps\.com)/i

export function analyzeSeo(input: SeoInput): { checks: SeoCheck[]; score: number } {
  const keyword = input.focusKeyword.trim().toLowerCase()
  const seoTitle = input.metaTitle.trim() || input.title.trim()
  const description = input.metaDescription.trim() || input.excerpt.trim()
  const text = stripHtml(input.content)
  const words = text ? text.split(' ').length : 0
  const firstParagraph = stripHtml(input.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? text.slice(0, 600))
  const subheadings = [...input.content.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) => stripHtml(m[1]))
  const links = [...input.content.matchAll(/<a\s[^>]*href="([^"]*)"/gi)].map((m) => m[1])
  const internalLinks = links.filter((h) => INTERNAL_HOSTS.test(h)).length
  const externalLinks = links.length - internalLinks
  const images = [...input.content.matchAll(/<img\s[^>]*>/gi)].map((m) => m[0])
  const imagesMissingAlt = images.filter((tag) => !/\salt="[^"]+"/i.test(tag)).length

  const checks: SeoCheck[] = []
  const add = (id: string, label: string, status: CheckStatus, tip?: string) => checks.push({ id, label, status, tip })

  // Focus keyword
  if (!keyword) {
    add('kw', 'Set a focus keyword', 'bad', 'The main search phrase you want this post to rank for, e.g. "anti-fouling paint Kenya".')
  } else {
    add('kw-title', 'Focus keyword in SEO title', containsKeyword(seoTitle, keyword) ? 'good' : 'bad',
      'Put the keyword in the title, ideally near the start.')
    add('kw-desc', 'Focus keyword in meta description', containsKeyword(description, keyword) ? 'good' : 'warn',
      'Search engines bold the keyword in the snippet, which lifts click-through.')
    const slugHit = keyword.split(/\s+/).filter(Boolean).every((w) => input.slug.includes(slugify(w)))
    add('kw-slug', 'Focus keyword in URL slug', slugHit ? 'good' : 'warn', 'Include the keyword words in the slug.')
    add('kw-intro', 'Focus keyword in the first paragraph', containsKeyword(firstParagraph, keyword) ? 'good' : 'warn',
      'Mention it early so readers and crawlers know the topic straight away.')
    add('kw-heading', 'Focus keyword in a subheading', subheadings.some((h) => containsKeyword(h, keyword)) ? 'good' : 'warn',
      'Use it (or a close variant) in at least one H2 or H3.')
    const density = words ? (countKeyword(text, keyword) * keyword.split(/\s+/).length * 100) / words : 0
    const dStatus: CheckStatus = density >= 0.5 && density <= 2.5 ? 'good' : density > 2.5 ? 'bad' : 'warn'
    add('kw-density', `Keyword density ${density.toFixed(1)}%`, dStatus,
      dStatus === 'bad' ? 'Too repetitive — this reads as keyword stuffing. Aim for 0.5–2.5%.' : 'Aim for 0.5–2.5% — use it naturally a few times.')
  }

  // Title & description length
  const tLen = seoTitle.length
  add('title-len', `SEO title length (${tLen}/${TITLE_MAX})`, tLen >= 30 && tLen <= TITLE_MAX ? 'good' : tLen === 0 ? 'bad' : 'warn',
    tLen > TITLE_MAX ? 'Google truncates titles past ~60 characters.' : 'Aim for 30–60 characters.')
  const dLen = description.length
  add('desc-len', `Meta description length (${dLen}/${DESCRIPTION_MAX})`,
    dLen >= 120 && dLen <= DESCRIPTION_MAX ? 'good' : dLen === 0 ? 'bad' : 'warn',
    dLen > DESCRIPTION_MAX ? 'It will be cut off in results — trim to 160.' : 'Aim for 120–160 characters that sell the click.')

  // Content
  add('length', `Content length: ${words} words`, words >= 800 ? 'good' : words >= 400 ? 'warn' : 'bad',
    'In-depth posts (800+ words) rank better for competitive terms.')
  add('headings', `${subheadings.length} subheading${subheadings.length === 1 ? '' : 's'}`, subheadings.length >= 2 ? 'good' : 'warn',
    'Break the post into sections with H2/H3 — it also builds the table of contents.')
  add('internal', `${internalLinks} internal link${internalLinks === 1 ? '' : 's'}`, internalLinks >= 2 ? 'good' : internalLinks === 1 ? 'warn' : 'bad',
    'Link to relevant products, guides and other posts (e.g. /products/…) to pass authority around the site.')
  add('external', `${externalLinks} external link${externalLinks === 1 ? '' : 's'}`, externalLinks >= 1 ? 'good' : 'warn',
    'Citing an authoritative source (standards body, Hempel, ISO) builds trust.')

  // Media
  add('cover', 'Cover image with alt text', input.coverImageUrl && input.coverImageAlt.trim() ? 'good' : input.coverImageUrl ? 'warn' : 'bad',
    'Used for social previews and Google Discover. Describe it in the alt text.')
  if (images.length > 0) {
    add('img-alt', imagesMissingAlt ? `${imagesMissingAlt} image(s) missing alt text` : 'All images have alt text',
      imagesMissingAlt ? 'bad' : 'good', 'Alt text makes images rank in Google Images and helps accessibility.')
  }

  // Extras
  add('excerpt', 'Excerpt written', input.excerpt.trim().length >= 50 ? 'good' : 'warn', 'Shown on the listing page and used as a fallback description.')
  add('slug-len', 'Short, readable URL', input.slug && input.slug.length <= 75 ? 'good' : 'warn', 'Keep slugs under ~75 characters.')
  add('faqs', input.faqCount ? `${input.faqCount} FAQ${input.faqCount === 1 ? '' : 's'} (rich result eligible)` : 'No FAQs added',
    input.faqCount ? 'good' : 'warn', 'FAQs are published as FAQPage structured data and can win extra space in search results.')

  const weight = { good: 1, warn: 0.5, bad: 0 }
  const score = Math.round((checks.reduce((sum, c) => sum + weight[c.status], 0) / checks.length) * 100)
  return { checks, score }
}

export function scoreColor(score: number) {
  return score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'
}
