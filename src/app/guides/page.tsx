import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { GUIDES } from '@/lib/guides/guides'

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Technical guides on protective and marine coatings from Clin Corp, Kenya\'s authorised Hempel distributor.',
  robots: { index: false, follow: false },
}

export default function GuidesIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#040D1A' }} className="text-white">
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
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
              Technical Guides
            </div>
            <h1 className="font-sans font-black leading-[0.95]" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Guides
            </h1>
            <p className="font-sans text-sm sm:text-base mt-4 max-w-2xl leading-relaxed" style={{ color: '#8899AE' }}>
              Reference material on Hempel coating systems, specification, and application — built from Clin
              Corp&apos;s technical documentation.
            </p>
          </div>
        </section>

        <section className="pb-20 sm:pb-28" style={{ background: '#FAFAF8' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {GUIDES.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group rounded-2xl border bg-white p-6 sm:p-7 cursor-pointer transition-all duration-200 hover:shadow-[0_8px_32px_rgba(26,43,94,0.09)] hover:border-gold/30"
                  style={{ borderColor: 'rgba(26,43,94,0.10)' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.10)' }}>
                      <BookOpen size={16} style={{ color: '#F5A623' }} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>{guide.category}</span>
                  </div>
                  <h2 className="font-sans font-black text-lg mb-2" style={{ color: '#1A2B5E' }}>{guide.title}</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7A99' }}>{guide.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors group-hover:text-blue" style={{ color: '#0070C0' }}>
                    Read Guide <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
