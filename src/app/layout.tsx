import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, SITE_NAME } from '@/lib/site'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Clin Corps | Authorized Hempel Distributor — Industrial & Marine Coatings Kenya',
    template: '%s | Clin Corps Kenya',
  },
  description:
    'Clin Corps is Kenya\'s Authorized Distributor for Hempel Industrial and Marine Coatings. Serving East Africa from Nairobi since 2024 with 37% market share. Anti-corrosion, anti-fouling, hull protection & infrastructure coatings.',
  keywords: [
    'Hempel distributor Kenya',
    'industrial coatings Kenya',
    'marine coatings East Africa',
    'Hempel paints Nairobi',
    'anti-corrosion coatings Kenya',
    'anti-fouling paint Kenya',
    'protective coatings Nairobi',
    'Clin Corps Kenya',
    'Hempel authorized distributor',
    'paint distributor Kenya',
    'hull protection coatings',
    'industrial paint Nairobi',
    'marine paint Mombasa',
    'coating solutions East Africa',
    'infrastructure coatings Kenya',
  ],
  authors: [{ name: 'Clin Corps Limited', url: SITE_URL }],
  creator: 'Clin Corps Limited',
  publisher: 'Clin Corps Limited',
  category: 'Industrial Coatings & Paint Distribution',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Clin Corps — Future Today | Authorized Hempel Distributor, Kenya',
    description:
      'Kenya\'s Authorized Distributor for Hempel Industrial & Marine Coatings. 37% East Africa market share. Nairobi, Kenya — Est. 2024.',
    images: [
      {
        url: '/clincorp_logo.png',
        width: 1200,
        height: 630,
        alt: 'Clin Corps — Authorized Hempel Distributor Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clin Corps | Hempel Coatings Distributor — Kenya',
    description:
      'Authorized Hempel Industrial & Marine Coatings distributor in Kenya. 37% East Africa market share since 2024.',
    images: ['/clincorp_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased bg-dark text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
