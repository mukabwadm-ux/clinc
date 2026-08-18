export interface GuideSummary {
  slug: string
  title: string
  description: string
  category: string
}

/**
 * Index of published guides. Add an entry here plus a page under
 * src/app/guides/[slug]/ for each new guide.
 */
export const GUIDES: GuideSummary[] = [
  {
    slug: 'marine-paint-systems',
    title: 'Marine Paint Systems',
    description:
      "Recommended Hempel coating systems for every area of a vessel — topside to cargo holds — plus a look at Hempel's antifouling technology.",
    category: 'Marine',
  },
]
