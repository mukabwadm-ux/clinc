import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Tag, Beaker, Wrench, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Hempalin Enamel 52140 | Marine Topcoat',
  description: 'Hempalin Enamel 52140 — a glossy, general purpose alkyd topcoat forming a weather resistant coating. Resistant to salt water and mineral oil. Available in Kenya via Clin-Corp.',
}

export default function HempalinEnamel52140() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-white" style={{ background: '#040D1A' }}>

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans flex-wrap" style={{ color: '#6B7A99' }}>
            <a href="/products" className="hover:text-gold transition-colors duration-200 flex items-center gap-1 cursor-pointer">
              <ArrowLeft size={13} /> Products
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <a href="/products#marine" className="hover:text-gold transition-colors duration-200 cursor-pointer">Marine Coatings</a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span className="text-white">Hempalin Enamel 52140</span>
          </div>
        </div>

        {/* ── Product hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">

            {/* Product image column */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-full rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-8 sm:p-12 bg-white">
                <Image
                  src="/hempel-product-can.png"
                  alt="Hempalin Enamel 52140"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200"
                style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 24px rgba(245,166,35,0.28)' }}
              >
                GET A QUOTE <ArrowRight size={15} />
              </a>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }}
              >
                REQUEST DATA SHEET
              </a>

              {/* Trust badge */}
              <div className="w-full rounded-xl p-4 flex items-center gap-3 mt-1" style={{ border: '1px solid rgba(245,166,35,0.15)', background: 'rgba(245,166,35,0.04)' }}>
                <ShieldCheck size={18} style={{ color: '#F5A623' }} className="shrink-0" />
                <div>
                  <p className="font-sans font-bold text-white text-xs">Genuine Hempel Product</p>
                  <p className="font-sans text-[11px] mt-0.5" style={{ color: '#6B7A99' }}>Supplied by Authorized Distributor</p>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,112,192,0.15)', color: '#0070C0' }}>
                  <Tag size={10} /> Topcoats
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
                  #52140
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,212,180,0.10)', color: '#00D4B4' }}>
                  Marine
                </span>
              </div>

              {/* Name */}
              <h1 className="font-sans font-black text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                Hempalin Enamel <span style={{ color: '#F5A623' }}>52140</span>
              </h1>

              <div className="w-12 h-0.5 mt-4 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

              {/* Info cards */}
              <div className="space-y-4">
                <div className="rounded-2xl p-6 sm:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,112,192,0.15)' }}>
                      <Beaker size={15} className="text-blue" />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Description</h2>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed" style={{ color: '#6B7A99' }}>
                    Hempalin Enamel 52140 is a glossy, general purpose, alkyd topcoat forming a weather resistant coating. The product is flexible and resistant to salt water and spillage of mineral oil and other aliphatic hydrocarbons. Complies with EU Directive 2004/42/EC, subcategory i.
                  </p>
                </div>

                <div className="rounded-2xl p-6 sm:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.12)' }}>
                      <Wrench size={15} style={{ color: '#F5A623' }} />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Recommended Use</h2>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed" style={{ color: '#6B7A99' }}>
                    Hempalin Enamel 52140 is recommended as finishing coat for alkyd systems on exterior and interior steel and woodwork in mildly to moderately corrosive environment e.g. engine rooms including tank tops, main engines and auxiliary machinery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Back link ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
          <a
            href="/products#marine"
            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-200"
            style={{ color: '#F5A623' }}
          >
            <ArrowLeft size={14} /> Back to Marine Coatings
          </a>
        </div>

      </main>
      <Footer />
    </>
  )
}
