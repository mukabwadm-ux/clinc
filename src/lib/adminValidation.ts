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

export const contactPatchSchema = z.object({
  is_read: z.boolean(),
})

export const uuidSchema = z.string().uuid('Invalid ID')

export type ProductInput = z.infer<typeof productSchema>
