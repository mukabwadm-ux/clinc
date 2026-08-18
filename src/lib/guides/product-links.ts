/**
 * Maps a guide's product label to its live /products/[slug] page, for the
 * subset of named products that already have one. Checked against the
 * catalog on 2026-08-18 — most products named in guides don't have a page
 * yet, so this stays a manual allowlist rather than a fuzzy match, to avoid
 * ever linking to a product that isn't actually the one named.
 */
export const CATALOG_PRODUCT_SLUGS: Record<string, string> = {
  'Hempadur Quattro 17634': 'hempadur-quattro-17634',
  'Hempadur Tie Coat 49183': 'hempadur-tiecoat-49183',
  'Hempalin Enamel 52140': 'hempalin-enamel-52140',
  'Hempathane Topcoat 55210': 'hempathane-topcoat-55210',
  'Hempadur 85671': 'hempadur-85671',
  'Olympic+': 'antifouling-olympic-protect-plus',
}

/**
 * Guide labels sometimes carry a leading "or " or a trailing parenthetical
 * ("Hempatex Enamel 56360 (needs a tie-coat)"). Strip those before matching
 * so the core product name still resolves.
 */
export function productSlug(label: string): string | undefined {
  const core = label.replace(/^or\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '').trim()
  return CATALOG_PRODUCT_SLUGS[core]
}
