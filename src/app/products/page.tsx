import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore Clin-Corp\'s range of Hempel Industrial & Marine Coatings — anti-corrosion, anti-fouling, hull protection, and infrastructure coatings available in Kenya and East Africa.',
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="py-12 sm:py-16 lg:py-24">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">
              HEMPEL COATINGS
            </p>
            <h1
              className="font-sans font-black text-white mt-2 sm:mt-3"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
            >
              Our <span className="text-blue">Products.</span>
            </h1>
            <p className="font-sans text-slate text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
              Authorized distributor of Hempel&apos;s complete range of industrial and marine coatings — engineered to protect assets across East Africa.
            </p>
            <div
              className="w-16 h-0.5 mt-6 rounded-full"
              style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
            />
          </div>

          {/* Products content — coming soon placeholder */}
          <div className="flex flex-col items-center justify-center py-20 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #00AEEF, #1A3272)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <h2
              className="font-sans font-black text-white"
              style={{ fontSize: 'clamp(22px, 4vw, 36px)' }}
            >
              Products Coming Soon
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-md">
              Our full product catalogue is being prepared. In the meantime, contact us directly for product availability and pricing.
            </p>
            <a
              href="/#contact"
              className="mt-8 inline-flex items-center justify-center bg-blue text-white rounded-md px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
            >
              CONTACT US
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
