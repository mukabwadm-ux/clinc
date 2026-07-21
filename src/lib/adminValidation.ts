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
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000).transform(strip),
  image_url: z.string().max(500).nullable().optional().transform(v => v || null),
  slug: z
    .string()
    .max(200)
    .regex(/^[a-z0-9-]*$/, 'Slug: lowercase letters, numbers, hyphens only')
    .nullable()
    .optional()
    .transform(v => v || null),
  is_active: z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).max(9999).default(0),
})

export const contactPatchSchema = z.object({
  is_read: z.boolean(),
})

export const uuidSchema = z.string().uuid('Invalid ID')

export type ProductInput = z.infer<typeof productSchema>
