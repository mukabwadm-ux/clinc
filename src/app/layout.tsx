import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/JsonLd'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://clincorp.co.ke'),
  title: {
    default: 'Clincorps | Authorized Hempel Distributor — Industrial & Marine Coatings Kenya',
    template: '%s | Clincorps Kenya',
  },
  description:
    'Clincorps is Kenya\'s Authorized Distributor for Hempel Industrial and Marine Coatings. Serving East Africa from Nairobi since 2024 with 37% market share. Anti-corrosion, anti-fouling, hull protection & infrastructure coatings.',
  keywords: [
    'Hempel distributor Kenya',
    'industrial coatings Kenya',
    'marine coatings East Africa',
    'Hempel paints Nairobi',
    'anti-corrosion coatings Kenya',
    'anti-fouling paint Kenya',
    'protective coatings Nairobi',
    'Clincorps Kenya',
    'Hempel authorized distributor',
    'paint distributor Kenya',
    'hull protection coatings',
    'industrial paint Nairobi',
    'marine paint Mombasa',
    'coating solutions East Africa',
    'infrastructure coatings Kenya',
  ],
  authors: [{ name: 'Clincorps Limited', url: 'https://clincorp.co.ke' }],
  creator: 'Clincorps Limited',
  publisher: 'Clincorps Limited',
  category: 'Industrial Coatings & Paint Distribution',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://clincorp.co.ke',
    siteName: 'Clincorps',
    title: 'Clincorps — Future Today | Authorized Hempel Distributor, Kenya',
    description:
      'Kenya\'s Authorized Distributor for Hempel Industrial & Marine Coatings. 37% East Africa market share. Nairobi, Kenya — Est. 2024.',
    images: [
      {
        url: '/clincorp_logo.png',
        width: 1200,
        height: 630,
        alt: 'Clincorps — Authorized Hempel Distributor Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clincorps | Hempel Coatings Distributor — Kenya',
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
    canonical: 'https://clincorp.co.ke',
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
