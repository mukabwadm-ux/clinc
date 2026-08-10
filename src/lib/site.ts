// Single source of truth for the public site identity.
// Set NEXT_PUBLIC_SITE_URL in Vercel to change the domain; the fallback
// keeps production correct if the variable is ever missing.
// Metadata, sitemap, robots, JSON-LD and transactional email all follow.

const FALLBACK_URL = 'https://clincorps.com'

// Referenced statically so Next.js can inline it at build time.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL

/** Canonical origin, never with a trailing slash. */
export const SITE_URL = rawUrl.replace(/\/+$/, '')

export const SITE_NAME = 'Clincorps'

/** Inbox that receives contact + quote form submissions. */
export const CONTACT_EMAIL = 'clin@clincorps.com'

/** Resend "from" address — the domain must be verified in Resend. */
export const SENDER_EMAIL = `${SITE_NAME} Website <enquiries@clincorps.com>`
