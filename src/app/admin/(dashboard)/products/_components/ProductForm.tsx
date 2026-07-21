'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Image as ImageIcon, FileText, ShieldCheck, ClipboardList, Upload, ExternalLink } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string(),
  tag: z.string().min(1, 'Tag/type is required'),
  category: z.enum(['marine', 'industrial'] as const),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image_url: z.string(),
  slug: z.string().regex(/^[a-z0-9-]*$/, 'Slug: only lowercase letters, numbers and hyphens'),
  is_active: z.boolean(),
  sort_order: z.number().int().min(0),
  product_data_sheet_url: z.string(),
  safety_data_sheet_url: z.string(),
  application_instruction_url: z.string(),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  name: '', code: '', tag: '', category: 'marine',
  description: '', image_url: '', slug: '',
  is_active: true, sort_order: 0,
  product_data_sheet_url: '', safety_data_sheet_url: '', application_instruction_url: '',
}

const marineTags = ['Topcoats', 'Anti-Fouling', 'Hull Protection', 'Anti-Corrosion', 'Primer', 'Deck Coating', 'Underwater Coating']
const industrialTags = ['Anti-Corrosion', 'Structural Steel', 'Fire Protection', 'Floor Coating', 'Pipeline', 'Tank Lining', 'Primer']

interface Props {
  initial?: Partial<FormValues>
  productId?: string
}

export default function ProductForm({ initial, productId }: Props) {
  const router = useRouter()
  const isEdit = !!productId

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...initial },
  })

  const category = watch('category')
  const imageUrl = watch('image_url')
  const isActive = watch('is_active')
  const pdsUrl = watch('product_data_sheet_url')
  const sdsUrl = watch('safety_data_sheet_url')
  const aiUrl = watch('application_instruction_url')

  const tagSuggestions = category === 'marine' ? marineTags : industrialTags

  async function onSubmit(values: FormValues) {
    const url = isEdit ? `/api/admin/products/${productId}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      const data = await res.json()
      setError('root', { message: data.error ?? 'Something went wrong. Please try again.' })
    }
  }

  return (
    <div>
      <a href="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors cursor-pointer" style={{ color: '#6B7A99' }}>
        <ArrowLeft size={14} /> Back to Products
      </a>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Main 3-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — product details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Product Details</h2>

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
                <textarea {...register('description')} rows={4} placeholder="Describe what this product does, its key benefits..." className={`${fc(!!errors.description)} resize-none`} />
              </Field>
            </div>
          </div>

          {/* Right — settings */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Settings</h2>

              <Field label="Image URL" error={errors.image_url?.message}>
                <input {...register('image_url')} type="text" placeholder="https://… or /product.png" className={fc(false)} />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Leave blank to show no image</p>
              </Field>

              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl" style={{ border: '1px solid rgba(26,43,94,0.12)' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              ) : (
                <div className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{ background: '#F5F7FA', border: '1px dashed #CBD5E1' }}>
                  <ImageIcon size={20} style={{ color: '#CBD5E1' }} />
                  <p className="text-xs" style={{ color: '#CBD5E1' }}>Image preview</p>
                </div>
              )}

              <Field label="Slug (detail page link)" error={errors.slug?.message}>
                <input {...register('slug')} type="text" placeholder="e.g. hempalin-enamel-52140" className={fc(!!errors.slug)} />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Links to /products/[slug]</p>
              </Field>

              <Field label="Sort Order" error={errors.sort_order?.message}>
                <input {...register('sort_order', { valueAsNumber: true })} type="number" min={0} className={fc(false)} />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Lower = appears first</p>
              </Field>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-sans font-semibold text-sm" style={{ color: '#1A2B5E' }}>Active</p>
                  <p className="text-xs" style={{ color: '#9CAABB' }}>Visible on the website</p>
                </div>
                <button type="button" onClick={() => setValue('is_active', !isActive)} className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer" style={{ background: isActive ? '#F5A623' : '#CBD5E1' }} aria-pressed={isActive}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents — full width */}
        <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div className="mb-4">
            <h2 className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Downloadable Documents</h2>
            <p className="text-xs mt-0.5" style={{ color: '#9CAABB' }}>All fields optional — only upload what is available for this product. Accepted: PDF, DOC, DOCX (max 10 MB each)</p>
          </div>

          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            <DocUpload
              label="Product Data Sheet"
              description="Technical specifications and product properties"
              icon={<FileText size={15} style={{ color: '#0070C0' }} />}
              iconBg="rgba(0,112,192,0.08)"
              fieldKey="pds"
              url={pdsUrl}
              onUpload={url => setValue('product_data_sheet_url', url)}
              onRemove={() => setValue('product_data_sheet_url', '')}
            />
            <DocUpload
              label="Safety Data Sheet"
              description="Hazard information, handling and disposal guidance"
              icon={<ShieldCheck size={15} style={{ color: '#10B981' }} />}
              iconBg="rgba(16,185,129,0.08)"
              fieldKey="sds"
              url={sdsUrl}
              onUpload={url => setValue('safety_data_sheet_url', url)}
              onRemove={() => setValue('safety_data_sheet_url', '')}
            />
            <DocUpload
              label="Application Instructions"
              description="Surface preparation, mixing ratios and application guide"
              icon={<ClipboardList size={15} style={{ color: '#F5A623' }} />}
              iconBg="rgba(245,166,35,0.08)"
              fieldKey="ai"
              url={aiUrl}
              onUpload={url => setValue('application_instruction_url', url)}
              onRemove={() => setValue('application_instruction_url', '')}
            />
          </div>
        </div>

        {/* Submit row */}
        <div className="flex items-center justify-end gap-4">
          {errors.root && (
            <div role="alert" className="flex-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span>⚠</span> {errors.root.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer shrink-0"
            style={{ background: '#F5A623', color: '#0D1B4B' }}
          >
            {isSubmitting ? (
              <><span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> Saving…</>
            ) : (
              <><Save size={15} /> {isEdit ? 'Save Changes' : 'Create Product'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────

function fc(hasError: boolean) {
  return `w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-blue-200 border ${hasError ? 'ring-1 ring-red-400 border-red-300' : 'border-slate-200'}`
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="block font-sans text-xs font-semibold mb-1.5" style={{ color: '#6B7A99' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{error}</p>}
    </div>
  )
}

interface DocUploadProps {
  label: string
  description: string
  icon: React.ReactNode
  iconBg: string
  fieldKey: string
  url: string
  onUpload: (url: string) => void
  onRemove: () => void
}

function DocUpload({ label, description, icon, iconBg, fieldKey, url, onUpload, onRemove }: DocUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErr('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Upload failed'); return }
      onUpload(data.url)
    } catch {
      setErr('Network error — please try again')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      {/* Left — icon + info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm leading-none mb-0.5" style={{ color: '#1A2B5E' }}>{label}</p>
          <p className="text-xs" style={{ color: '#9CAABB' }}>{description}</p>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mt-1 hover:underline" style={{ color: '#0070C0' }}>
              <ExternalLink size={10} /> View uploaded file
            </a>
          )}
          {err && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{err}</p>}
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 shrink-0">
        {url && (
          <button type="button" onClick={onRemove} className="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors" style={{ color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
            Remove
          </button>
        )}
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" id={fieldKey} />
        <label htmlFor={fieldKey} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all select-none"
          style={{
            border: '1px solid rgba(26,43,94,0.15)',
            color: uploading ? '#9CAABB' : '#475569',
            pointerEvents: uploading ? 'none' : 'auto',
            opacity: uploading ? 0.6 : 1,
          }}>
          {uploading
            ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</>
            : <><Upload size={11} /> {url ? 'Replace' : 'Upload'}</>
          }
        </label>
      </div>
    </div>
  )
}
