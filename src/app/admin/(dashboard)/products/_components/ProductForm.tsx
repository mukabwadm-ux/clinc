'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'

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
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  name: '', code: '', tag: '', category: 'marine',
  description: '', image_url: '', slug: '',
  is_active: true, sort_order: 0,
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Product Details</h2>

              <Field label="Product Name *" error={errors.name?.message}>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="e.g. Hempalin Enamel 52140"
                  className={fieldClass(!!errors.name)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Product Code" error={errors.code?.message}>
                  <input
                    {...register('code')}
                    type="text"
                    placeholder="e.g. #52140"
                    className={fieldClass(false)}
                  />
                </Field>

                <Field label="Category *" error={errors.category?.message}>
                  <select {...register('category')} className={fieldClass(false)}>
                    <option value="marine">Marine</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </Field>
              </div>

              <Field label="Tag / Type *" error={errors.tag?.message}>
                <input
                  {...register('tag')}
                  type="text"
                  list="tag-suggestions"
                  placeholder="e.g. Topcoats"
                  className={fieldClass(!!errors.tag)}
                />
                <datalist id="tag-suggestions">
                  {tagSuggestions.map(t => <option key={t} value={t} />)}
                </datalist>
              </Field>

              <Field label="Description *" error={errors.description?.message}>
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Describe what this product does, its key benefits..."
                  className={`${fieldClass(!!errors.description)} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
              <h2 className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Settings</h2>

              <Field label="Image URL" error={errors.image_url?.message}>
                <input
                  {...register('image_url')}
                  type="text"
                  placeholder="https://… or /product-image.png"
                  className={fieldClass(false)}
                />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Leave blank to show no image on the card</p>
              </Field>

              {/* Image preview */}
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-xl"
                  style={{ border: '1px solid rgba(26,43,94,0.12)' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              ) : (
                <div className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-1.5" style={{ background: '#F5F7FA', border: '1px dashed #CBD5E1' }}>
                  <ImageIcon size={20} style={{ color: '#CBD5E1' }} />
                  <p className="text-xs" style={{ color: '#CBD5E1' }}>Image preview</p>
                </div>
              )}

              <Field label="Slug (detail page link)" error={errors.slug?.message}>
                <input
                  {...register('slug')}
                  type="text"
                  placeholder="e.g. hempalin-enamel-52140"
                  className={fieldClass(!!errors.slug)}
                />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Links to /products/[slug]. Leave blank for Enquire button.</p>
              </Field>

              <Field label="Sort Order" error={errors.sort_order?.message}>
                <input
                  {...register('sort_order', { valueAsNumber: true })}
                  type="number"
                  min={0}
                  className={fieldClass(false)}
                />
                <p className="text-xs mt-1" style={{ color: '#9CAABB' }}>Lower numbers appear first</p>
              </Field>

              {/* Active toggle */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-sans font-semibold text-sm" style={{ color: '#1A2B5E' }}>Active</p>
                  <p className="text-xs" style={{ color: '#9CAABB' }}>Visible on the website</p>
                </div>
                <button
                  type="button"
                  onClick={() => setValue('is_active', !isActive)}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  style={{ background: isActive ? '#F5A623' : '#CBD5E1' }}
                  aria-pressed={isActive}
                  aria-label="Toggle active"
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            {/* Root error */}
            {errors.root && (
              <div role="alert" className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}>
                <span className="shrink-0">⚠</span>
                <span>{errors.root.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-300"
              style={{ background: '#F5A623', color: '#0D1B4B' }}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={15} />
                  {isEdit ? 'Save Changes' : 'Create Product'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function fieldClass(hasError: boolean) {
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
