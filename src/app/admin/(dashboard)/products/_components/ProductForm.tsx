'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray, useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import {
  ArrowLeft, Save, FileText, ShieldCheck, ClipboardList,
  Upload, ExternalLink, Plus, X, ImageIcon,
} from 'lucide-react'

const RichTextEditor = dynamic(() => import('../../../_components/RichTextEditor'), { ssr: false })

// ── Schema ──────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string(),
  tag: z.string().min(1, 'Tag/type is required'),
  category: z.enum(['marine', 'industrial'] as const),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().regex(/^[a-z0-9-]*$/, 'Slug: only lowercase letters, numbers and hyphens'),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  featured_image_url: z.string(),
  featured_image_alt: z.string(),
  sort_order: z.number().int().min(0),
  images: z.array(z.object({
    url: z.string().min(1),
    alt: z.string().min(1, 'Alt text is required'),
  })),
  product_data_sheet_url: z.string(),
  safety_data_sheet_url: z.string(),
  application_instruction_url: z.string(),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  name: '', code: '', tag: '', category: 'marine',
  description: '', slug: '', is_active: true, is_featured: false,
  featured_image_url: '', featured_image_alt: '', sort_order: 0,
  images: [] as Array<{ url: string; alt: string }>,
  product_data_sheet_url: '', safety_data_sheet_url: '', application_instruction_url: '',
}

const marineTags = ['Topcoats', 'Anti-Fouling', 'Hull Protection', 'Anti-Corrosion', 'Primer', 'Deck Coating', 'Underwater Coating']
const industrialTags = ['Anti-Corrosion', 'Structural Steel', 'Fire Protection', 'Floor Coating', 'Pipeline', 'Tank Lining', 'Primer']

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  initial?: Partial<FormValues>
  productId?: string
}

export default function ProductForm({ initial, productId }: Props) {
  const router = useRouter()
  const isEdit = !!productId
  const [slugManual, setSlugManual] = useState(isEdit)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...initial },
  })

  const { fields: imgFields, append: addImg, remove: removeImg } = useFieldArray({ control, name: 'images' })

  const category = watch('category')
  const nameVal  = watch('name')
  const isActive        = watch('is_active')
  const isFeatured      = watch('is_featured')
  const featImgUrl      = watch('featured_image_url')
  const featImgAlt      = watch('featured_image_alt')
  const pdsUrl   = watch('product_data_sheet_url')
  const sdsUrl   = watch('safety_data_sheet_url')
  const aiUrl    = watch('application_instruction_url')

  // Auto-slug from name (only when not manually edited)
  useEffect(() => {
    if (slugManual) return
    const slug = nameVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    setValue('slug', slug)
  }, [nameVal, slugManual, setValue])

  const tagSuggestions = category === 'marine' ? marineTags : industrialTags

  // Description controller for RichTextEditor
  const { field: descField } = useController({ control, name: 'description' })

  async function onSubmit(values: FormValues) {
    const url    = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    if (res.ok) { router.push('/admin/products'); router.refresh() }
    else { const d = await res.json(); setError('root', { message: d.error ?? 'Something went wrong.' }) }
  }

  return (
    <div>
      <a href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 cursor-pointer" style={{ color: '#6B7A99' }}>
        <ArrowLeft size={14} /> Back to Products
      </a>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Main 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — core fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Product Details</h2>

              <Field label="Product Name *" error={errors.name?.message}>
                <input {...register('name')} type="text" placeholder="e.g. Hempalin Enamel 52140" className={fc(!!errors.name)} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Product Code" error={errors.code?.message}>
                  <input {...register('code')} type="text" placeholder="e.g. #52140" className={fc(false)} />
                </Field>
                <Field label="Category *" error={errors.category?.message}>
                  <select {...register('category')} className={fc(false)}>
                    <option value="marine">Marine</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </Field>
              </div>

              <Field label="Tag / Type *" error={errors.tag?.message}>
                <input {...register('tag')} type="text" list="tag-suggestions" placeholder="e.g. Topcoats" className={fc(!!errors.tag)} />
                <datalist id="tag-suggestions">
                  {tagSuggestions.map(t => <option key={t} value={t} />)}
                </datalist>
              </Field>

              <Field label="Description *" error={errors.description?.message}>
                <RichTextEditor value={descField.value} onChange={descField.onChange} error={errors.description?.message} />
              </Field>
            </div>
          </div>

          {/* Right — settings */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Settings</h2>

              {/* Slug with auto-sync toggle */}
              <Field label="Slug" error={errors.slug?.message}>
                <div className="relative">
                  <input
                    {...register('slug')}
                    type="text"
                    placeholder="auto-generated"
                    className={fc(!!errors.slug) + ' pr-20'}
                    onFocus={() => setSlugManual(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setSlugManual(m => !m)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition-all"
                    style={{ background: slugManual ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.10)', color: slugManual ? '#EF4444' : '#10B981' }}
                    title={slugManual ? 'Click to auto-sync from name' : 'Auto-syncing from name'}
                  >
                    {slugManual ? 'manual' : 'auto'}
                  </button>
                </div>
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Links to /products/[slug]</p>
              </Field>

              <Field label="Sort Order" error={errors.sort_order?.message}>
                <input {...register('sort_order', { valueAsNumber: true })} type="number" min={0} className={fc(false)} />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Lower = appears first</p>
              </Field>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1A2B5E' }}>Active</p>
                  <p className="text-xs" style={{ color: '#9CAABB' }}>Visible on the website</p>
                </div>
                <button type="button" onClick={() => setValue('is_active', !isActive)}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{ background: isActive ? '#F5A623' : '#CBD5E1' }} aria-pressed={isActive}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid rgba(26,43,94,0.07)' }}>
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1A2B5E' }}>Featured</p>
                  <p className="text-xs" style={{ color: '#9CAABB' }}>Shown in the Featured Product section</p>
                </div>
                <button type="button" onClick={() => setValue('is_featured', !isFeatured)}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer"
                  style={{ background: isFeatured ? '#0070C0' : '#CBD5E1' }} aria-pressed={isFeatured}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Featured Image */}
              <div className="pt-3" style={{ borderTop: '1px solid rgba(26,43,94,0.07)' }}>
                <p className="font-semibold text-sm mb-0.5" style={{ color: '#1A2B5E' }}>Featured Image</p>
                <p className="text-xs mb-3" style={{ color: '#9CAABB' }}>Main image shown in the Featured section. Alt text required.</p>

                {featImgUrl ? (
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.10)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featImgUrl} alt={featImgAlt || ''} className="w-full h-36 object-contain bg-slate-50 p-3" />
                    <div className="p-2.5 space-y-2">
                      <input
                        {...register('featured_image_alt')}
                        type="text"
                        placeholder="Alt text *"
                        className="w-full text-xs px-2.5 py-1.5 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
                        style={{ borderColor: errors.featured_image_alt ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
                      />
                      {errors.featured_image_alt && <p className="text-[10px]" style={{ color: '#EF4444' }}>{errors.featured_image_alt.message}</p>}
                      <button
                        type="button"
                        onClick={() => { setValue('featured_image_url', ''); setValue('featured_image_alt', '') }}
                        className="text-xs px-3 py-1 rounded-lg border cursor-pointer"
                        style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.2)' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <FeaturedImageUploader
                    onUploaded={(url, alt) => { setValue('featured_image_url', url); setValue('featured_image_alt', alt) }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Images ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Product Images</h2>
              <p className="text-xs mt-0.5" style={{ color: '#9CAABB' }}>JPEG, PNG, WEBP — max 500 KB each. Alt text is required.</p>
            </div>
          </div>

          {/* Existing images grid */}
          {imgFields.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {imgFields.map((field, idx) => (
                <div key={field.id} className="relative group rounded-xl overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.10)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={field.url} alt={field.alt} className="w-full h-28 object-cover" />
                  <div className="p-2">
                    <input
                      {...register(`images.${idx}.alt`)}
                      type="text"
                      placeholder="Alt text *"
                      className="w-full text-xs px-2 py-1 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
                      style={{ borderColor: errors.images?.[idx]?.alt ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
                    />
                    {errors.images?.[idx]?.alt && (
                      <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.images[idx]?.alt?.message}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImg(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add image upload area */}
          <ImageUploader
            onUploaded={(url) => addImg({ url, alt: '' })}
          />
        </div>

        {/* ── Documents ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div className="mb-4">
            <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>Downloadable Documents</h2>
            <p className="text-xs mt-0.5" style={{ color: '#9CAABB' }}>Optional. PDF, DOC, DOCX — max 10 MB each.</p>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            <DocUpload label="Product Data Sheet" description="Technical specifications and product properties" icon={<FileText size={15} style={{ color: '#0070C0' }} />} iconBg="rgba(0,112,192,0.08)" fieldKey="pds" url={pdsUrl} onUpload={url => setValue('product_data_sheet_url', url)} onRemove={() => setValue('product_data_sheet_url', '')} />
            <DocUpload label="Safety Data Sheet" description="Hazard information, handling and disposal guidance" icon={<ShieldCheck size={15} style={{ color: '#10B981' }} />} iconBg="rgba(16,185,129,0.08)" fieldKey="sds" url={sdsUrl} onUpload={url => setValue('safety_data_sheet_url', url)} onRemove={() => setValue('safety_data_sheet_url', '')} />
            <DocUpload label="Application Instructions" description="Surface preparation, mixing ratios and application guide" icon={<ClipboardList size={15} style={{ color: '#F5A623' }} />} iconBg="rgba(245,166,35,0.08)" fieldKey="ai" url={aiUrl} onUpload={url => setValue('application_instruction_url', url)} onRemove={() => setValue('application_instruction_url', '')} />
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center justify-end gap-4">
          {errors.root && (
            <div role="alert" className="flex-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span>⚠</span> {errors.root.message}
            </div>
          )}
          <button type="submit" disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer shrink-0"
            style={{ background: '#F5A623', color: '#0D1B4B' }}>
            {isSubmitting
              ? <><span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> Saving…</>
              : <><Save size={15} /> {isEdit ? 'Save Changes' : 'Create Product'}</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

// ── ImageUploader ─────────────────────────────────────────────────────────────

function ImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [alt, setAlt] = useState('')
  const [altErr, setAltErr] = useState('')
  const [uploadErr, setUploadErr] = useState('')
  const [pending, setPending] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadErr('')
    setAltErr('')
    setPending(file)
    setAlt('')
    if (inputRef.current) inputRef.current.value = ''
  }

  async function confirmUpload() {
    if (!pending) return
    if (!alt.trim()) { setAltErr('Alt text is required'); return }
    setUploading(true)
    setUploadErr('')
    const fd = new FormData()
    fd.append('file', pending)
    fd.append('alt', alt.trim())
    fd.append('bucket', 'product-images')
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setUploadErr(data.error ?? 'Upload failed'); return }
      onUploaded(data.url)
      setPending(null)
      setAlt('')
    } catch { setUploadErr('Network error — try again') }
    finally { setUploading(false) }
  }

  return (
    <div>
      {pending ? (
        // Alt text input before upload
        <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8F9FB', border: '1px solid rgba(26,43,94,0.10)' }}>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={URL.createObjectURL(pending)} alt="" className="w-16 h-16 object-cover rounded-lg shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#1A2B5E' }}>{pending.name}</p>
              <p className="text-xs" style={{ color: '#9CAABB' }}>{(pending.size / 1024).toFixed(1)} KB</p>
            </div>
            <button type="button" onClick={() => setPending(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={16} /></button>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: '#6B7A99' }}>Alt text * <span style={{ color: '#9CAABB', fontWeight: 400 }}>(describe the image for accessibility)</span></label>
            <input
              type="text"
              value={alt}
              onChange={e => { setAlt(e.target.value); setAltErr('') }}
              placeholder="e.g. Hempalin Enamel 52140 product can"
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: altErr ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
            />
            {altErr && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{altErr}</p>}
            {uploadErr && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{uploadErr}</p>}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPending(null)} className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer" style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}>Cancel</button>
            <button type="button" onClick={confirmUpload} disabled={uploading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg cursor-pointer disabled:opacity-50"
              style={{ background: '#F5A623', color: '#0D1B4B' }}>
              {uploading ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={11} /> Upload Image</>}
            </button>
          </div>
        </div>
      ) : (
        // Upload button
        <div>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFile} className="hidden" id="img-upload" />
          <label htmlFor="img-upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border cursor-pointer transition-all"
            style={{ borderColor: 'rgba(26,43,94,0.15)', color: '#475569', borderStyle: 'dashed' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F5A623'; (e.currentTarget as HTMLElement).style.color = '#B45309' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,43,94,0.15)'; (e.currentTarget as HTMLElement).style.color = '#475569' }}
          >
            <Plus size={15} /> Add Image
          </label>
        </div>
      )}
    </div>
  )
}

// ── FeaturedImageUploader ─────────────────────────────────────────────────────

function FeaturedImageUploader({ onUploaded }: { onUploaded: (url: string, alt: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [alt, setAlt] = useState('')
  const [altErr, setAltErr] = useState('')
  const [uploadErr, setUploadErr] = useState('')
  const [pending, setPending] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploadErr(''); setAltErr(''); setPending(file); setAlt('')
    if (inputRef.current) inputRef.current.value = ''
  }

  async function confirmUpload() {
    if (!pending) return
    if (!alt.trim()) { setAltErr('Alt text is required'); return }
    setUploading(true); setUploadErr('')
    const fd = new FormData()
    fd.append('file', pending); fd.append('alt', alt.trim()); fd.append('bucket', 'product-images')
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setUploadErr(data.error ?? 'Upload failed'); return }
      onUploaded(data.url, alt.trim())
      setPending(null); setAlt('')
    } catch { setUploadErr('Network error — try again') }
    finally { setUploading(false) }
  }

  return (
    <div>
      {pending ? (
        <div className="rounded-xl p-3 space-y-2.5" style={{ background: '#F8F9FB', border: '1px solid rgba(26,43,94,0.10)' }}>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={URL.createObjectURL(pending)} alt="" className="w-14 h-14 object-cover rounded-lg shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: '#1A2B5E' }}>{pending.name}</p>
              <p className="text-xs" style={{ color: '#9CAABB' }}>{(pending.size / 1024).toFixed(1)} KB</p>
            </div>
            <button type="button" onClick={() => setPending(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={15} /></button>
          </div>
          <div>
            <input type="text" value={alt} onChange={e => { setAlt(e.target.value); setAltErr('') }}
              placeholder="Alt text *"
              className="w-full text-xs px-2.5 py-1.5 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
              style={{ borderColor: altErr ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
            />
            {altErr && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{altErr}</p>}
            {uploadErr && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{uploadErr}</p>}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPending(null)} className="text-xs px-3 py-1 rounded-lg border cursor-pointer" style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}>Cancel</button>
            <button type="button" onClick={confirmUpload} disabled={uploading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg cursor-pointer disabled:opacity-50"
              style={{ background: '#0070C0', color: '#fff' }}>
              {uploading ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={11} /> Upload</>}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFile} className="hidden" id="feat-img-upload" />
          <label htmlFor="feat-img-upload"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border cursor-pointer transition-all"
            style={{ borderColor: 'rgba(26,43,94,0.15)', color: '#475569', borderStyle: 'dashed' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0070C0'; (e.currentTarget as HTMLElement).style.color = '#0070C0' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,43,94,0.15)'; (e.currentTarget as HTMLElement).style.color = '#475569' }}>
            <ImageIcon size={13} /> Upload Featured Image
          </label>
        </div>
      )}
    </div>
  )
}

// ── DocUpload ─────────────────────────────────────────────────────────────────

interface DocUploadProps {
  label: string; description: string; icon: React.ReactNode; iconBg: string
  fieldKey: string; url: string; onUpload: (url: string) => void; onRemove: () => void
}

function DocUpload({ label, description, icon, iconBg, fieldKey, url, onUpload, onRemove }: DocUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true); setErr('')
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'product-documents')
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Upload failed'); return }
      onUpload(data.url)
    } catch { setErr('Network error') }
    finally { setUploading(false); if (inputRef.current) inputRef.current.value = '' }
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>{icon}</div>
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-none mb-0.5" style={{ color: '#1A2B5E' }}>{label}</p>
          <p className="text-xs" style={{ color: '#9CAABB' }}>{description}</p>
          {url && <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mt-1 hover:underline" style={{ color: '#0070C0' }}><ExternalLink size={10} /> View file</a>}
          {err && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{err}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {url && (
          <button type="button" onClick={onRemove} className="text-xs px-3 py-1.5 rounded-lg cursor-pointer" style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>Remove</button>
        )}
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" id={fieldKey} />
        <label htmlFor={fieldKey} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
          style={{ border: '1px solid rgba(26,43,94,0.15)', color: uploading ? '#9CAABB' : '#475569', pointerEvents: uploading ? 'none' : 'auto', opacity: uploading ? 0.6 : 1 }}>
          {uploading ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={11} /> {url ? 'Replace' : 'Upload'}</>}
        </label>
      </div>
    </div>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function fc(hasError: boolean) {
  return `w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200 border ${hasError ? 'ring-1 ring-red-400 border-red-300' : 'border-slate-200'}`
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  )
}
