'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm, useFieldArray, useController, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import {
  ArrowLeft, Save, ExternalLink, Plus, X, ImageIcon, Upload, Search, HelpCircle, Settings2, CheckCircle2,
} from 'lucide-react'
import {
  POST_CATEGORIES, DESCRIPTION_MAX, TITLE_MAX, analyzeSeo, slugify, wordCount, readingMinutes,
} from '@/lib/blog/shared'
import { ScoreRing, SerpPreview, SeoChecklist, CharCounter } from './SeoPanel'

const PostEditor = dynamic(() => import('./PostEditor'), {
  ssr: false,
  loading: () => <div className="min-h-[480px] rounded-xl bg-white" style={{ border: '1px solid rgba(26,43,94,0.15)' }} />,
})

// ── Schema ──────────────────────────────────────────────────────────────────

const schema = z.object({
  type: z.enum(['blog', 'article'] as const),
  status: z.enum(['draft', 'published'] as const),
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and single hyphens only'),
  excerpt: z.string().max(400, 'Keep the excerpt under 400 characters'),
  content: z.string(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  author_name: z.string().min(1, 'Author is required'),
  cover_image_url: z.string(),
  cover_image_alt: z.string(),
  meta_title: z.string().max(120),
  meta_description: z.string().max(320),
  focus_keyword: z.string().max(100),
  canonical_url: z.string().refine(v => !v || /^https:\/\/\S+$/.test(v), 'Must start with https://'),
  noindex: z.boolean(),
  is_featured: z.boolean(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  published_at: z.string(), // datetime-local value, '' = not set
}).superRefine((v, ctx) => {
  if (v.status === 'published' && !v.content.replace(/<[^>]*>/g, '').trim()) {
    ctx.addIssue({ code: 'custom', path: ['content'], message: 'Write some content before publishing' })
  }
  if (v.cover_image_url && !v.cover_image_alt.trim()) {
    ctx.addIssue({ code: 'custom', path: ['cover_image_alt'], message: 'Alt text is required for the cover image' })
  }
})

export type PostFormValues = z.infer<typeof schema>

const defaultValues: PostFormValues = {
  type: 'blog', status: 'draft', title: '', slug: '', excerpt: '', content: '',
  category: 'General', tags: [], author_name: 'Clin Corp Technical Team',
  cover_image_url: '', cover_image_alt: '', meta_title: '', meta_description: '', focus_keyword: '',
  canonical_url: '', noindex: false, is_featured: false, faqs: [], published_at: '',
}

/** ISO → value for <input type="datetime-local"> in the browser's timezone. */
export function isoToLocalInput(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  initial?: Partial<PostFormValues>
  postId?: string
  /** Live URL — only for posts that are currently public. */
  liveSlug?: string | null
  internalLinks: { label: string; href: string }[]
}

export default function PostForm({ initial, postId, liveSlug, internalLinks }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEdit = !!postId
  const [slugManual, setSlugManual] = useState(isEdit)
  const [savedAt, setSavedAt] = useState<Date | null>(searchParams.get('saved') ? new Date() : null)
  const [tagDraft, setTagDraft] = useState('')
  const [openedAt] = useState(() => Date.now())

  const {
    register, handleSubmit, setValue, control, setError, reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...initial },
  })

  const { fields: faqFields, append: addFaq, remove: removeFaq } = useFieldArray({ control, name: 'faqs' })
  const { field: contentField } = useController({ control, name: 'content' })
  const v = useWatch({ control }) as PostFormValues

  // Auto-slug from title until the slug is edited by hand.
  useEffect(() => {
    if (!slugManual) setValue('slug', slugify(v.title ?? '').slice(0, 80).replace(/-$/, ''), { shouldDirty: true })
  }, [v.title, slugManual, setValue])

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault() }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const seoTitle = v.meta_title?.trim() || (v.title ? `${v.title} | Clin Corp Kenya` : '')
  const seoDescription = v.meta_description?.trim() || v.excerpt?.trim() || ''
  const seo = useMemo(() => analyzeSeo({
    title: v.title ?? '', slug: v.slug ?? '', excerpt: v.excerpt ?? '', content: v.content ?? '',
    metaTitle: seoTitle, metaDescription: v.meta_description ?? '', focusKeyword: v.focus_keyword ?? '',
    coverImageUrl: v.cover_image_url ?? '', coverImageAlt: v.cover_image_alt ?? '',
    faqCount: (v.faqs ?? []).filter(f => f.question?.trim() && f.answer?.trim()).length,
  }), [v, seoTitle])

  const words = wordCount(v.content ?? '')
  const publishAt = v.published_at ? new Date(v.published_at) : null
  const isScheduled = v.status === 'published' && publishAt !== null && publishAt.getTime() > openedAt
  const submitLabel = v.status === 'draft' ? 'Save Draft' : isScheduled ? 'Schedule' : isEdit ? 'Update' : 'Publish'

  function addTag(raw: string) {
    const parts = raw.split(',').map(t => t.trim()).filter(Boolean)
    if (!parts.length) return
    const next = [...new Set([...(v.tags ?? []), ...parts])].slice(0, 20)
    setValue('tags', next, { shouldDirty: true })
    setTagDraft('')
  }

  async function onSubmit(values: PostFormValues) {
    const payload = {
      ...values,
      published_at: values.published_at ? new Date(values.published_at).toISOString() : null,
    }
    const res = await fetch(isEdit ? `/api/admin/posts/${postId}` : '/api/admin/posts', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError('root', { message: data.error ?? 'Something went wrong.' })
      return
    }
    // Server may have filled in the publish date — mirror it so the form is clean.
    reset({ ...values, published_at: isoToLocalInput(data.published_at) })
    if (isEdit) {
      setSavedAt(new Date())
      router.refresh()
    } else {
      router.replace(`/admin/posts/${data.id}/edit?saved=1`)
    }
  }

  const card = 'bg-white rounded-2xl p-6 shadow-sm'
  const cardBorder = { border: '1px solid rgba(26,43,94,0.07)' }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <a href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer" style={{ color: '#6B7A99' }}>
          <ArrowLeft size={14} /> Back to Blogs &amp; Articles
        </a>
        {liveSlug && (
          <a href={`/blog/${liveSlug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer" style={{ color: '#0070C0' }}>
            <ExternalLink size={14} /> View live
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
        {/* ── Main column ── */}
        <div className="space-y-6 min-w-0">
          <div className={`${card} space-y-5`} style={cardBorder}>
            <Field label="Title *" error={errors.title?.message}>
              <input
                {...register('title')}
                type="text"
                placeholder="e.g. How to Choose Anti-Fouling Paint for Boats in Kenya"
                className={fc(!!errors.title) + ' text-base font-semibold'}
              />
            </Field>

            <Field label="URL slug *" error={errors.slug?.message}>
              <div className="flex items-stretch rounded-lg border overflow-hidden focus-within:ring-2 focus-within:ring-blue-200" style={{ borderColor: errors.slug ? '#FCA5A5' : '#E2E8F0' }}>
                <span className="hidden sm:flex items-center px-3 text-xs font-mono shrink-0" style={{ background: '#F8F9FB', color: '#9CAABB', borderRight: '1px solid #E2E8F0' }}>
                  clincorps.com/blog/
                </span>
                <input
                  {...register('slug')}
                  type="text"
                  onFocus={() => setSlugManual(true)}
                  className="flex-1 min-w-0 px-3 py-2.5 text-sm font-mono outline-none text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setSlugManual(m => !m)}
                  className="text-[10px] font-mono px-2.5 cursor-pointer shrink-0"
                  style={{ background: slugManual ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.08)', color: slugManual ? '#EF4444' : '#10B981' }}
                  title={slugManual ? 'Click to sync from the title again' : 'Syncing from the title'}
                >
                  {slugManual ? 'manual' : 'auto'}
                </button>
              </div>
              {isEdit && liveSlug && v.slug !== liveSlug && (
                <p className="text-xs mt-1.5" style={{ color: '#B45309' }}>
                  Changing the slug of a live post breaks existing links to it and resets its search ranking.
                </p>
              )}
            </Field>

            <Field label="Excerpt" error={errors.excerpt?.message} hint="1–2 sentences shown on listing cards and under the title. Also the fallback meta description.">
              <textarea {...register('excerpt')} rows={3} placeholder="A short summary that makes people want to read on." className={fc(!!errors.excerpt) + ' resize-y'} />
              <CharCounter value={v.excerpt ?? ''} min={100} max={DESCRIPTION_MAX} />
            </Field>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold" style={{ color: '#6B7A99' }}>Content {v.status === 'published' && '*'}</p>
              <p className="font-mono text-[11px]" style={{ color: '#9CAABB' }}>
                {words.toLocaleString()} words · {readingMinutes(v.content ?? '')} min read
              </p>
            </div>
            <PostEditor value={contentField.value} onChange={contentField.onChange} error={errors.content?.message} internalLinks={internalLinks} />
            {errors.content && <p className="text-xs px-1" style={{ color: '#EF4444' }}>{errors.content.message}</p>}
            <p className="text-[11px] px-1" style={{ color: '#9CAABB' }}>
              Use Heading 2 for main sections and Heading 3 for sub-points — they build the table of contents. The post title is already the page&apos;s H1.
            </p>
          </div>

          {/* SEO */}
          <div className={card} style={cardBorder}>
            <div className="flex items-center gap-4 mb-5">
              <ScoreRing score={seo.score} />
              <div>
                <h2 className="flex items-center gap-1.5 font-black text-sm" style={{ color: '#1A2B5E' }}><Search size={14} /> Search Engine Optimisation</h2>
                <p className="text-xs mt-0.5" style={{ color: '#6B7A99' }}>
                  {seo.score >= 80 ? 'Well optimised — ready to rank.' : seo.score >= 50 ? 'Good start. Work through the items below.' : 'Needs work before this can rank well.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-5">
                <Field label="Focus keyword" hint="The one phrase this post should rank for. One post per keyword.">
                  <input {...register('focus_keyword')} type="text" placeholder="e.g. anti-fouling paint Kenya" className={fc(false)} />
                </Field>
                <Field label="SEO title" error={errors.meta_title?.message} hint="Leave empty to use the post title + “| Clin Corp Kenya”.">
                  <input {...register('meta_title')} type="text" placeholder={seoTitle || 'Title shown in Google'} className={fc(!!errors.meta_title)} />
                  <CharCounter value={seoTitle} min={30} max={TITLE_MAX} />
                </Field>
                <Field label="Meta description" error={errors.meta_description?.message} hint="Leave empty to use the excerpt.">
                  <textarea {...register('meta_description')} rows={3} placeholder={v.excerpt || 'What searchers read under the title in Google'} className={fc(!!errors.meta_description) + ' resize-y'} />
                  <CharCounter value={seoDescription} min={120} max={DESCRIPTION_MAX} />
                </Field>
                <div>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>Google preview</p>
                  <SerpPreview title={seoTitle} description={seoDescription} slug={v.slug ?? ''} date={v.published_at ? new Date(v.published_at).toISOString() : null} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: '#6B7A99' }}>Checklist</p>
                <SeoChecklist checks={seo.checks} />
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className={card} style={cardBorder}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="flex items-center gap-1.5 font-black text-sm" style={{ color: '#1A2B5E' }}><HelpCircle size={14} /> FAQs</h2>
                <p className="text-xs mt-0.5" style={{ color: '#9CAABB' }}>
                  Shown at the end of the post and published as FAQ structured data, which can earn extra space in Google results. Answer questions people actually search for.
                </p>
              </div>
              <button type="button" onClick={() => addFaq({ question: '', answer: '' })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-dashed cursor-pointer shrink-0 hover:border-amber-400"
                style={{ borderColor: 'rgba(26,43,94,0.2)', color: '#475569' }}>
                <Plus size={13} /> Add FAQ
              </button>
            </div>
            {faqFields.length === 0 ? (
              <p className="text-sm py-2" style={{ color: '#9CAABB' }}>No FAQs yet — e.g. “How often should a ship be re-coated with anti-fouling?”</p>
            ) : (
              <div className="space-y-3">
                {faqFields.map((f, i) => (
                  <div key={f.id} className="rounded-xl p-4 space-y-2 relative" style={{ background: '#F8F9FB', border: '1px solid rgba(26,43,94,0.08)' }}>
                    <button type="button" onClick={() => removeFaq(i)} aria-label="Remove FAQ" className="absolute top-3 right-3 p-1 rounded cursor-pointer hover:bg-white" style={{ color: '#9CAABB' }}>
                      <X size={14} />
                    </button>
                    <input {...register(`faqs.${i}.question`)} type="text" placeholder="Question" className={fc(false) + ' font-semibold pr-10'} />
                    <textarea {...register(`faqs.${i}.answer`)} rows={3} placeholder="Answer — clear and self-contained, 40–80 words works best." className={fc(false) + ' resize-y'} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6 xl:sticky xl:top-6">
          {/* Publish */}
          <div className={`${card} space-y-5`} style={cardBorder}>
            <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Publish</h2>

            <Segmented
              label="Type"
              value={v.type}
              options={[{ value: 'blog', label: 'Blog' }, { value: 'article', label: 'Article' }]}
              onChange={val => setValue('type', val as PostFormValues['type'], { shouldDirty: true })}
              hint={v.type === 'article' ? 'Long-form, in-depth reference content.' : 'Shorter, timely posts — news, tips, updates.'}
            />
            <Segmented
              label="Status"
              value={v.status}
              options={[{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }]}
              onChange={val => setValue('status', val as PostFormValues['status'], { shouldDirty: true })}
              hint={v.status === 'draft' ? 'Only visible here in the admin.' : isScheduled ? 'Goes live automatically at the publish date.' : 'Visible on the website.'}
            />

            <Field label="Publish date" hint="Set a future date to schedule. Empty = when you publish.">
              <input {...register('published_at')} type="datetime-local" className={fc(false)} />
            </Field>

            <Toggle label="Featured" hint="Shown large at the top of the blog page" checked={v.is_featured} onChange={val => setValue('is_featured', val, { shouldDirty: true })} />

            <div className="space-y-3 pt-1">
              {errors.root && (
                <div role="alert" className="rounded-xl px-4 py-2.5 text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {errors.root.message}
                </div>
              )}
              {Object.keys(errors).some(k => k !== 'root') && (
                <p className="text-xs" style={{ color: '#EF4444' }}>Please fix the highlighted fields.</p>
              )}
              <button type="submit" disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer"
                style={{ background: '#F5A623', color: '#0D1B4B' }}>
                {isSubmitting
                  ? <><span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> Saving…</>
                  : <><Save size={15} /> {submitLabel}</>}
              </button>
              <p className="text-[11px] text-center" style={{ color: isDirty ? '#B45309' : '#10B981' }}>
                {isDirty
                  ? 'Unsaved changes'
                  : savedAt
                    ? <span className="inline-flex items-center gap-1"><CheckCircle2 size={11} /> Saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    : null}
              </p>
            </div>
          </div>

          {/* Cover image */}
          <div className={card} style={cardBorder}>
            <h2 className="font-black text-sm mb-0.5" style={{ color: '#1A2B5E' }}>Cover Image</h2>
            <p className="text-xs mb-3" style={{ color: '#9CAABB' }}>Used on cards and social shares. Landscape 1200×675 works best.</p>
            {v.cover_image_url ? (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.10)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.cover_image_url} alt={v.cover_image_alt || ''} className="w-full aspect-[16/9] object-cover bg-slate-50" />
                <div className="p-2.5 space-y-2">
                  <input {...register('cover_image_alt')} type="text" placeholder="Alt text *"
                    className="w-full text-xs px-2.5 py-1.5 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
                    style={{ borderColor: errors.cover_image_alt ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }} />
                  {errors.cover_image_alt && <p className="text-[10px]" style={{ color: '#EF4444' }}>{errors.cover_image_alt.message}</p>}
                  <button type="button" onClick={() => { setValue('cover_image_url', '', { shouldDirty: true }); setValue('cover_image_alt', '', { shouldDirty: true }) }}
                    className="text-xs px-3 py-1 rounded-lg border cursor-pointer" style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.2)' }}>
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <CoverUploader onUploaded={(url, alt) => { setValue('cover_image_url', url, { shouldDirty: true }); setValue('cover_image_alt', alt, { shouldDirty: true }) }} />
            )}
          </div>

          {/* Organise */}
          <div className={`${card} space-y-5`} style={cardBorder}>
            <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Organise</h2>
            <Field label="Category *" error={errors.category?.message}>
              <input {...register('category')} type="text" list="post-categories" className={fc(!!errors.category)} />
              <datalist id="post-categories">
                {POST_CATEGORIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </Field>
            <Field label="Tags" hint="Press Enter or comma to add.">
              {(v.tags ?? []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {v.tags.map(t => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full" style={{ background: 'rgba(26,43,94,0.06)', color: '#1A2B5E' }}>
                      {t}
                      <button type="button" aria-label={`Remove ${t}`} onClick={() => setValue('tags', v.tags.filter(x => x !== t), { shouldDirty: true })} className="p-0.5 rounded-full cursor-pointer hover:bg-white">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={tagDraft}
                onChange={e => { if (e.target.value.endsWith(',')) addTag(e.target.value); else setTagDraft(e.target.value) }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagDraft) } }}
                onBlur={() => addTag(tagDraft)}
                placeholder="e.g. hempel, ship maintenance"
                className={fc(false)}
              />
            </Field>
            <Field label="Author *" error={errors.author_name?.message}>
              <input {...register('author_name')} type="text" className={fc(!!errors.author_name)} />
            </Field>
          </div>

          {/* Advanced */}
          <details className={card} style={cardBorder}>
            <summary className="flex items-center gap-1.5 font-black text-sm cursor-pointer list-none" style={{ color: '#1A2B5E' }}>
              <Settings2 size={14} /> Advanced SEO
            </summary>
            <div className="space-y-5 mt-5">
              <Field label="Canonical URL" error={errors.canonical_url?.message} hint="Only if this content was first published elsewhere. Leave empty otherwise.">
                <input {...register('canonical_url')} type="url" placeholder="https://…" className={fc(!!errors.canonical_url)} />
              </Field>
              <Toggle label="Hide from search engines" hint="Adds noindex and leaves it out of the sitemap" checked={v.noindex} onChange={val => setValue('noindex', val, { shouldDirty: true })} danger />
            </div>
          </details>
        </div>
      </form>
    </div>
  )
}

// ── Cover uploader ───────────────────────────────────────────────────────────

function CoverUploader({ onUploaded }: { onUploaded: (url: string, alt: string) => void }) {
  const [pending, setPending] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [err, setErr] = useState('')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const preview = useMemo(() => (pending ? URL.createObjectURL(pending) : null), [pending])
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  async function upload() {
    if (!pending) return
    if (!alt.trim()) { setErr('Alt text is required'); return }
    setUploading(true); setErr('')
    const fd = new FormData()
    fd.append('file', pending); fd.append('alt', alt.trim()); fd.append('bucket', 'product-images')
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Upload failed'); return }
      onUploaded(data.url, alt.trim())
      setPending(null); setAlt('')
    } catch { setErr('Network error — try again') }
    finally { setUploading(false) }
  }

  if (pending && preview) {
    return (
      <div className="rounded-xl p-3 space-y-2.5" style={{ background: '#F8F9FB', border: '1px solid rgba(26,43,94,0.10)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="" className="w-full aspect-[16/9] object-cover rounded-lg" />
        <input type="text" value={alt} onChange={e => { setAlt(e.target.value); setErr('') }} placeholder="Alt text * — describe the image"
          className="w-full text-xs px-2.5 py-1.5 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
          style={{ borderColor: err ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }} />
        {err && <p className="text-[10px]" style={{ color: '#EF4444' }}>{err}</p>}
        <div className="flex gap-2">
          <button type="button" onClick={() => setPending(null)} className="text-xs px-3 py-1 rounded-lg border cursor-pointer" style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}>Cancel</button>
          <button type="button" onClick={upload} disabled={uploading} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: '#0070C0', color: '#fff' }}>
            {uploading ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={11} /> Upload</>}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" id="cover-upload"
        onChange={e => { const f = e.target.files?.[0]; if (f) { setPending(f); setErr('') } if (inputRef.current) inputRef.current.value = '' }} />
      <label htmlFor="cover-upload" className="flex flex-col items-center justify-center gap-1.5 w-full aspect-[16/9] rounded-xl border border-dashed cursor-pointer transition-colors hover:border-blue-400 hover:text-blue"
        style={{ borderColor: 'rgba(26,43,94,0.18)', color: '#6B7A99' }}>
        <ImageIcon size={18} />
        <span className="text-xs font-semibold">Upload cover image</span>
        <span className="text-[10px]" style={{ color: '#9CAABB' }}>JPEG, PNG, WEBP · max 500 KB</span>
      </label>
    </div>
  )
}

// ── Small controls ───────────────────────────────────────────────────────────

function Segmented({ label, value, options, onChange, hint }: {
  label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div>
      <p className="text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>{label}</p>
      <div className="grid rounded-lg p-1 gap-1" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)`, background: '#F1F5F9' }} role="radiogroup" aria-label={label}>
        {options.map(o => (
          <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}
            className="py-1.5 rounded-md text-xs font-bold cursor-pointer transition-all"
            style={{ background: value === o.value ? '#FFFFFF' : 'transparent', color: value === o.value ? '#1A2B5E' : '#6B7A99', boxShadow: value === o.value ? '0 1px 3px rgba(26,43,94,0.12)' : undefined }}>
            {o.label}
          </button>
        ))}
      </div>
      {hint && <p className="text-xs mt-1.5" style={{ color: '#9CAABB' }}>{hint}</p>}
    </div>
  )
}

function Toggle({ label, hint, checked, onChange, danger }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="font-semibold text-sm" style={{ color: '#1A2B5E' }}>{label}</p>
        {hint && <p className="text-xs" style={{ color: '#9CAABB' }}>{hint}</p>}
      </div>
      <button type="button" onClick={() => onChange(!checked)} aria-pressed={checked} aria-label={label}
        className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0"
        style={{ background: checked ? (danger ? '#EF4444' : '#F5A623') : '#CBD5E1' }}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

function fc(hasError: boolean) {
  return `w-full rounded-lg px-4 py-2.5 text-sm text-slate-800 bg-white outline-none transition-all focus:ring-2 focus:ring-blue-200 border ${hasError ? 'ring-1 ring-red-400 border-red-300' : 'border-slate-200'}`
}

function Field({ label, children, error, hint }: { label: string; children: React.ReactNode; error?: string; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>{label}</label>
      {children}
      {error ? <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{error}</p> : hint ? <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>{hint}</p> : null}
    </div>
  )
}
