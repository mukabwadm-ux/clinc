import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clin-Corp — Future Today | Authorized Hempel Distributor, Kenya',
  description:
    'Clin-Corp is the Authorized Distributor for Hempel Industrial and Marine Coatings in Kenya. Serving East Africa from Nairobi since 2024.',
  openGraph: {
    title: 'Clin-Corp — Future Today',
    description:
      'Industrial & Marine Coatings across East Africa. 37% market share. Founded 2024.',
    locale: 'en_KE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased bg-dark text-white">
        {children}
      </body>
    </html>
  )
}
