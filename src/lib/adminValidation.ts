import { z } from 'zod'

const strip = (s: string) => s.replace(/<[^>]*>/g, '').trim()

export const loginSchema = z.object({
  email: z.string().email().max(254).transform(s => s.toLowerCase().trim()),
  password: z.string().min(1).max(200),
})

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200).transform(strip),
  code: z.string().max(50).transform(strip).nullable().optional().transform(v => v || null),
  tag: z.string().min(1, 'Tag is required').max(100).transform(strip),
  category: z.enum(['marine', 'industrial'] as const, {
    error: 'Category must be marine or industrial',
  }),
  description: z.string()
    .max(100000, 'Description is too long')
    .refine(v => v.replace(/<[^>]*>/g, '').trim().length >= 1, 'Description is required')
    .transform(s => s.trim()),
  image_url: z.string().max(500).nullable().optional().transform(v => v || null),
  images: z.array(z.object({
    url: z.string().min(1),
    alt: z.string().min(1, 'Alt text is required for each image'),
  })).optional().default([]),
  slug: z
    .string()
    .max(200)
    .regex(/^[a-z0-9-]*$/, 'Slug: lowercase letters, numbers, hyphens only')
    .nullable()
    .optional()
    .transform(v => v || null),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  featured_image_url: z.string().max(1000).nullable().optional().transform(v => v || null),
  featured_image_alt: z.string().max(500).nullable().optional().transform(v => v || null),
  sort_order: z.coerce.number().int().min(0).max(9999).default(0),
  product_data_sheet_url: z.string().max(1000).nullable().optional().transform(v => v || null),
  safety_data_sheet_url: z.string().max(1000).nullable().optional().transform(v => v || null),
  application_instruction_url: z.string().max(1000).nullable().optional().transform(v => v || null),
})

const optionalText = (max: number) =>
  z.string().max(max).transform(strip).nullable().optional().transform(v => v || null)

export const postSchema = z.object({
  type: z.enum(['blog', 'article'] as const, { error: 'Type must be blog or article' }),
  status: z.enum(['draft', 'published'] as const, { error: 'Status must be draft or published' }),
  title: z.string().min(1, 'Title is required').max(200).transform(strip),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug: lowercase letters, numbers, single hyphens only'),
  excerpt: z.string().max(400).transform(strip).default(''),
  content: z.string().max(300000, 'Content is too long').transform(s => s.trim()),
  category: z.string().min(1, 'Category is required').max(80).transform(strip),
  tags: z.array(z.string().max(50).transform(strip)).max(20).default([])
    .transform(tags => [...new Set(tags.filter(Boolean))]),
  author_name: z.string().min(1, 'Author is required').max(120).transform(strip),
  cover_image_url: z.string().max(1000).nullable().optional().transform(v => v || null),
  cover_image_alt: optionalText(300),
  meta_title: optionalText(120),
  meta_description: optionalText(320),
  focus_keyword: optionalText(100),
  canonical_url: z.string().max(500).nullable().optional().transform(v => v?.trim() || null)
    .refine(v => !v || /^https:\/\/\S+$/.test(v), 'Canonical URL must start with https://'),
  noindex: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  faqs: z.array(z.object({
    question: z.string().max(300).transform(strip),
    answer: z.string().max(2000).transform(strip),
  })).max(20).default([])
    .transform(faqs => faqs.filter(f => f.question && f.answer)),
  published_at: z.string().datetime({ offset: true }).nullable().optional().transform(v => v || null),
}).superRefine((v, ctx) => {
  if (v.status === 'published' && v.content.replace(/<[^>]*>/g, '').trim().length === 0) {
    ctx.addIssue({ code: 'custom', path: ['content'], message: 'Content is required to publish' })
  }
})

export type PostInput = z.infer<typeof postSchema>

export const contactPatchSchema = z.object({
  is_read: z.boolean(),
})

export const uuidSchema = z.string().uuid('Invalid ID')

export type ProductInput = z.infer<typeof productSchema>
