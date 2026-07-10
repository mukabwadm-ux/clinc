import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Tag, Beaker, Wrench } from 'lucide-react'
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
      <main className="min-h-screen bg-dark text-white">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          <div className="flex items-center gap-2 text-slate text-xs sm:text-sm font-sans">
            <a href="/products" className="hover:text-blue transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Products
            </a>
            <span>/</span>
            <a href="/products#marine" className="hover:text-blue transition-colors">Marine Coatings</a>
            <span>/</span>
            <span className="text-white">Hempalin Enamel 52140</span>
          </div>
        </div>

        {/* ── Product hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">

            {/* Product image */}
            <div className="flex flex-col items-center">
              <div
                className="w-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-8 sm:p-12"
                style={{ background: 'linear-gradient(135deg, #0D1B45, #07111F)' }}
              >
                <Image
                  src="/hempel-marine-can.png"
                  alt="Hempalin Enamel 52140"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              {/* Get a quote CTA below image */}
              <a
                href="/contact"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-blue text-white rounded-xl py-4 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.3)]"
              >
                GET A QUOTE <ArrowRight size={15} />
              </a>
              <a
                href="/contact"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-xl py-3.5 text-sm font-bold tracking-widest uppercase transition-all"
              >
                REQUEST DATA SHEET
              </a>
            </div>

            {/* Product details */}
            <div>
              {/* Category + code */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(0,174,239,0.12)', color: '#00AEEF' }}
                >
                  <Tag size={11} /> Topcoats
                </span>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}
                >
                  #52140
                </span>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(0,212,180,0.10)', color: '#00D4B4' }}
                >
                  Marine
                </span>
              </div>

              {/* Name */}
              <h1
                className="font-sans font-black text-white leading-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                Hempalin Enamel <span className="text-blue">52140</span>
              </h1>

              <div
                className="w-14 h-0.5 mt-4 mb-8 rounded-full"
                style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
              />

              {/* Description */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,174,239,0.15)' }}>
                      <Beaker size={16} className="text-blue" />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Description</h2>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] text-slate leading-relaxed">
                    Hempalin Enamel 52140 is a glossy, general purpose, alkyd topcoat forming a weather resistant coating. The product is flexible and resistant to salt water and spillage of mineral oil and other aliphatic hydrocarbons. Complies with EU Directive 2004/42/EC, subcategory i.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.15)' }}>
                      <Wrench size={16} style={{ color: '#F5A623' }} />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Recommended Use</h2>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] text-slate leading-relaxed">
                    Hempalin Enamel 52140 is recommended as finishing coat for alkyd systems on exterior and interior steel and woodwork in mildly to moderately corrosive environment e.g. engine rooms including tank tops, main engines and auxiliary machinery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Back to marine products ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <a
            href="/products#marine"
            className="inline-flex items-center gap-2 text-blue text-sm font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={15} /> Back to Marine Coatings
          </a>
        </div>

      </main>
      <Footer />
    </>
  )
}
