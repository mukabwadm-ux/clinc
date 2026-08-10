// Single source of truth for the public site identity.
// Change the domain here and metadata, sitemap, robots, JSON-LD and
// transactional email all follow.

export const SITE_URL = 'https://clincorps.com'
export const SITE_NAME = 'Clincorps'

/** Inbox that receives contact + quote form submissions. */
export const CONTACT_EMAIL = 'clin@clincorps.com'

/** Resend "from" address — the domain must be verified in Resend. */
export const SENDER_EMAIL = `${SITE_NAME} Website <enquiries@clincorps.com>`
