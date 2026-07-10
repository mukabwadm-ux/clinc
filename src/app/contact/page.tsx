import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Clin-Corp — Kenya\'s authorized Hempel coatings distributor. Reach us at our Nairobi office for product enquiries, quotes, and project consultations.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  )
}
