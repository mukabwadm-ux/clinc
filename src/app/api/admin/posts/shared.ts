import { revalidatePath } from 'next/cache'
import type { PostInput } from '@/lib/adminValidation'
import { readingMinutes } from '@/lib/blog/shared'

/** Derived columns the editor never sends directly. */
export function toPostRow(input: PostInput) {
  return {
    ...input,
    reading_minutes: readingMinutes(input.content),
    // Publishing without a date means "now"; drafts keep whatever was chosen.
    published_at: input.status === 'published' && !input.published_at ? new Date().toISOString() : input.published_at,
  }
}

/** Refresh every cached page a post appears on. */
export function revalidatePost(...slugs: (string | null | undefined)[]) {
  revalidatePath('/blog')
  revalidatePath('/blog/feed.xml')
  revalidatePath('/sitemap.xml')
  revalidatePath('/guides')
  for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`/blog/${slug}`)
}
