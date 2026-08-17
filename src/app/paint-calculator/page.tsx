import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import PaintCalculator from '@/components/paint-calculator/PaintCalculator'

export const metadata: Metadata = {
  title: 'Paint Calculator',
  description: 'Internal tool for estimating paint quantities, coverage and cost across Hempel protective coating systems.',
  robots: { index: false, follow: false },
}

export default function PaintCalculatorPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#040D1A' }} className="text-white">
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-14">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-5"
              style={{
                fontSize: 'clamp(9px, 2vw, 11px)',
                borderColor: 'rgba(245,166,35,0.35)',
                background: 'rgba(245,166,35,0.08)',
                color: '#F5A623',
                letterSpacing: '2px',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5A623' }} />
              Let&apos;s get you the right calculations
            </div>
            <h1 className="font-sans font-black leading-[0.95]" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Paint Calculator
            </h1>
            <p className="font-sans text-sm sm:text-base mt-4 max-w-2xl leading-relaxed" style={{ color: '#8899AE' }}>
              Build a job section by section, pick Hempel products from the Protective assortment, and get theoretical
              coverage, litres required and estimated cost — using the same formula as Clin Corp&apos;s quotations.
            </p>
          </div>
        </section>

        <section className="pb-20 sm:pb-28" style={{ background: '#FAFAF8' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <PaintCalculator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
