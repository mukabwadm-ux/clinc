import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Anchor, Factory } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Products',
  description: "Explore Clin-Corp's range of Hempel Industrial & Marine Coatings — anti-corrosion, anti-fouling, hull protection, and infrastructure coatings available in Kenya and East Africa.",
}

const marineProducts = [
  {
    name: 'Hempalin Enamel 52140',
    code: '#52140',
    tag: 'Topcoats',
    description: 'A glossy, general purpose alkyd topcoat forming a weather resistant coating. Flexible and resistant to salt water and spillage of mineral oil and aliphatic hydrocarbons.',
    image: '/hempel-product-can.png',
    href: '/products/hempalin-enamel-52140',
  },
  { name: 'Coming Soon', code: '', tag: 'Hull Protection', description: 'Engineered for superior protection in demanding marine environments. Contact us for product availability.', image: null, href: null },
  { name: 'Coming Soon', code: '', tag: 'Anti-Corrosion', description: 'Engineered for superior protection in demanding marine environments. Contact us for product availability.', image: null, href: null },
  { name: 'Coming Soon', code: '', tag: 'Anti-Fouling', description: 'Engineered for superior protection in demanding marine environments. Contact us for product availability.', image: null, href: null },
  { name: 'Coming Soon', code: '', tag: 'Primer', description: 'Engineered for superior protection in demanding marine environments. Contact us for product availability.', image: null, href: null },
  { name: 'Coming Soon', code: '', tag: 'Deck Coating', description: 'Engineered for superior protection in demanding marine environments. Contact us for product availability.', image: null, href: null },
]

const industrialProducts = [
  { name: 'Coming Soon', tag: 'Anti-Corrosion', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
  { name: 'Coming Soon', tag: 'Structural Steel', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
  { name: 'Coming Soon', tag: 'Fire Protection', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
  { name: 'Coming Soon', tag: 'Floor Coating', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
  { name: 'Coming Soon', tag: 'Pipeline', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
  { name: 'Coming Soon', tag: 'Tank Lining', description: 'Built to withstand the harshest industrial conditions and extend asset life. Contact us for product availability.' },
]

function ProductCard({ name, code, tag, description, image, href }: {
  name: string; code: string; tag: string; description: string
  image: string | null; href: string | null
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] hover:border-gold/35 bg-white/[0.03] hover:shadow-[0_8px_36px_rgba(245,166,35,0.07)] transition-all duration-300 overflow-hidden flex flex-col cursor-default">
      {/* Gold accent top line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(245,166,35,0.15))' }} />

      {image && (
        <div className="flex items-center justify-center px-8 pt-7 pb-4 bg-white rounded-b-none">
          <Image src={image} alt={name} width={154} height={154} className="object-contain drop-shadow-xl" />
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,112,192,0.15)', color: '#0070C0' }}>
            {tag}
          </span>
          {code && (
            <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest" style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
              {code}
            </span>
          )}
        </div>

        <h3 className="font-sans font-black text-white text-lg sm:text-xl leading-tight">{name}</h3>
        <p className="font-sans text-sm leading-relaxed mt-3 flex-1" style={{ color: '#6B7A99' }}>{description}</p>

        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/[0.06] flex-wrap">
          {href ? (
            <a href={href} className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer" style={{ color: '#0D1B4B', background: '#F5A623' }}>
              View Product <ArrowRight size={13} />
            </a>
          ) : (
            <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer" style={{ color: '#0D1B4B', background: '#F5A623' }}>
              Enquire <ArrowRight size={13} />
            </a>
          )}
          <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer hover:gap-2.5" style={{ color: '#6B7A99' }}>
            Get a Quote <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark text-white">

        {/* ── Page header ── */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-14 sm:pb-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>HEMPEL COATINGS</p>
            </div>
            <h1 className="font-sans font-black text-white leading-tight" style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}>
              Our <span className="text-blue">Products.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base mt-4 max-w-2xl leading-relaxed" style={{ color: '#6B7A99' }}>
              Authorized distributor of Hempel&apos;s complete range of marine and industrial coatings — engineered to protect assets across East Africa.
            </p>
            <div className="w-14 h-0.5 mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
          </div>
        </div>

        {/* ── Marine Coatings ── */}
        <section id="marine" className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #07111F, #0a1628)' }} />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,112,192,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,112,192,0.15)' }}>
                    <Anchor size={20} className="text-blue" />
                  </div>
                  <div className="h-px w-6 rounded-full" style={{ background: '#F5A623' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>HEMPEL MARINE</p>
                </div>
                <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}>
                  Marine <span style={{ color: '#F5A623' }}>Coatings.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base mt-3 max-w-xl leading-relaxed" style={{ color: '#6B7A99' }}>
                  High-performance coating systems for vessels, offshore structures, and marine infrastructure — protecting hulls and assets against biofouling and corrosion.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {marineProducts.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Industrial Coatings ── */}
        <section id="industrial" className="py-14 sm:py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.12)' }}>
                    <Factory size={20} style={{ color: '#F5A623' }} />
                  </div>
                  <div className="h-px w-6 rounded-full" style={{ background: '#F5A623' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>HEMPEL INDUSTRIAL</p>
                </div>
                <h2 className="font-sans font-black" style={{ fontSize: 'clamp(26px, 4vw, 48px)', color: '#1A2B5E' }}>
                  Industrial <span style={{ color: '#0070C0' }}>Coatings.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base mt-3 max-w-xl leading-relaxed" style={{ color: '#6B7A99' }}>
                  Durable coating solutions for infrastructure, manufacturing, oil &amp; gas, and energy sectors — engineered to withstand extreme conditions and extend asset life.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {industrialProducts.map((p, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border bg-white hover:shadow-[0_8px_36px_rgba(26,43,94,0.09)] hover:border-gold/40 transition-all duration-300 overflow-hidden flex flex-col cursor-default"
                  style={{ borderColor: 'rgba(26,43,94,0.09)' }}
                >
                  <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(0,112,192,0.4))' }} />
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <span
                      className="inline-block self-start px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4"
                      style={{ background: 'rgba(245,166,35,0.10)', color: '#B45309' }}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-sans font-black text-lg sm:text-xl leading-tight" style={{ color: '#1A2B5E' }}>{p.name}</h3>
                    <p className="font-sans text-sm leading-relaxed mt-3 flex-1" style={{ color: '#6B7A99' }}>{p.description}</p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold mt-5 cursor-pointer hover:gap-3 transition-all duration-200"
                      style={{ color: '#0070C0' }}
                    >
                      Get a Quote <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="py-14 sm:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #040D1A, #0D1B45, #040D1A)' }} />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <p className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#6B7A99' }}>PRODUCT ADVISORY</p>
              <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Need help choosing the <span style={{ color: '#F5A623' }}>right product?</span>
            </h2>
            <p className="font-sans text-sm sm:text-base mt-4 leading-relaxed" style={{ color: '#6B7A99' }}>
              Our technical team will advise on the best coating system for your specific application and environment.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200"
              style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.28)' }}
            >
              TALK TO OUR TEAM <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
