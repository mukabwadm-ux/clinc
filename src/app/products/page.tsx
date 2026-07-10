import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Anchor, Factory } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore Clin-Corp\'s range of Hempel Industrial & Marine Coatings — anti-corrosion, anti-fouling, hull protection, and infrastructure coatings available in Kenya and East Africa.',
}

const marineProducts = [
  {
    name: 'Hempalin Enamel 52140',
    code: '#52140',
    tag: 'Topcoats',
    description: 'A glossy, general purpose alkyd topcoat forming a weather resistant coating. Flexible and resistant to salt water and spillage of mineral oil and aliphatic hydrocarbons.',
    image: '/hempel-marine-can.png',
    href: '/products/hempalin-enamel-52140',
  },
  { name: 'Product Name', code: '', tag: 'Hull Protection', description: 'Short product description goes here. Engineered for superior protection in demanding marine environments.', image: null, href: null },
  { name: 'Product Name', code: '', tag: 'Anti-Corrosion', description: 'Short product description goes here. Engineered for superior protection in demanding marine environments.', image: null, href: null },
  { name: 'Product Name', code: '', tag: 'Anti-Fouling', description: 'Short product description goes here. Engineered for superior protection in demanding marine environments.', image: null, href: null },
  { name: 'Product Name', code: '', tag: 'Primer', description: 'Short product description goes here. Engineered for superior protection in demanding marine environments.', image: null, href: null },
  { name: 'Product Name', code: '', tag: 'Deck Coating', description: 'Short product description goes here. Engineered for superior protection in demanding marine environments.', image: null, href: null },
]

const industrialProducts = [
  { name: 'Product Name', tag: 'Anti-Corrosion', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
  { name: 'Product Name', tag: 'Structural Steel', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
  { name: 'Product Name', tag: 'Fire Protection', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
  { name: 'Product Name', tag: 'Floor Coating', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
  { name: 'Product Name', tag: 'Pipeline', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
  { name: 'Product Name', tag: 'Tank Lining', description: 'Short product description goes here. Built to withstand the harshest industrial conditions and extend asset life.' },
]

function ProductCard({ name, code, tag, description, image, href, accent }: {
  name: string; code: string; tag: string; description: string
  image: string | null; href: string | null; accent: string
}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 hover:border-blue/50 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-1 w-full" style={{ background: accent }} />

      {/* Product image if available */}
      {image && (
        <div className="flex items-center justify-center px-8 pt-8 pb-4" style={{ background: 'rgba(13,27,69,0.5)' }}>
          <Image src={image} alt={name} width={140} height={140} className="object-contain drop-shadow-xl" />
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,174,239,0.12)', color: '#00AEEF' }}>
            {tag}
          </span>
          {code && (
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest" style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
              {code}
            </span>
          )}
        </div>

        <h3 className="font-sans font-black text-white text-lg sm:text-xl leading-tight">{name}</h3>
        <p className="font-sans text-slate text-sm leading-relaxed mt-3 flex-1">{description}</p>

        <div className="flex items-center gap-4 mt-5 flex-wrap">
          {href && (
            <a href={href} className="inline-flex items-center gap-1.5 text-white text-xs font-bold tracking-widest uppercase border border-white/20 bg-white/5 hover:bg-white/10 rounded-lg px-4 py-2 transition-all">
              View Product <ArrowRight size={13} />
            </a>
          )}
          <a href="/contact" className="inline-flex items-center gap-1.5 text-blue text-xs font-bold tracking-widest uppercase hover:gap-2.5 transition-all">
            Get a Quote <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  highlight,
  description,
  accentColor,
}: {
  icon: React.ElementType
  eyebrow: string
  title: string
  highlight: string
  description: string
  accentColor: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accentColor}22` }}
          >
            <Icon size={20} style={{ color: accentColor }} />
          </div>
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: accentColor }}>
            {eyebrow}
          </p>
        </div>
        <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}>
          {title} <span style={{ color: accentColor }}>{highlight}</span>
        </h2>
        <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-xl leading-relaxed">{description}</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16">
          <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">HEMPEL COATINGS</p>
          <h1
            className="font-sans font-black text-white mt-2 sm:mt-3"
            style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
          >
            Our <span className="text-blue">Products.</span>
          </h1>
          <p className="font-sans text-slate text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
            Authorized distributor of Hempel&apos;s complete range of marine and industrial coatings — engineered to protect assets across East Africa.
          </p>
          <div className="w-16 h-0.5 mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }} />
        </div>

        {/* ── Marine Coatings ── */}
        <section id="marine" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #07111F, #0a1628)' }} />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,174,239,0.4), transparent)' }}
          />
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Anchor}
              eyebrow="HEMPEL MARINE"
              title="Marine"
              highlight="Coatings."
              description="High-performance coating systems for vessels, offshore structures, and marine infrastructure. Protecting hulls and assets against biofouling, corrosion, and the harshest sea conditions."
              accentColor="#00AEEF"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {marineProducts.map((p, i) => (
                <ProductCard key={i} {...p} accent="linear-gradient(90deg, #00AEEF, #00D4B4)" />
              ))}

            </div>
          </div>
        </section>

        {/* ── Industrial Coatings ── */}
        <section id="industrial" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-offwhite" />
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.15)' }}>
                    <Factory size={20} style={{ color: '#F5A623' }} />
                  </div>
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>
                    HEMPEL INDUSTRIAL
                  </p>
                </div>
                <h2 className="font-sans font-black" style={{ fontSize: 'clamp(26px, 4vw, 48px)', color: '#1A3272' }}>
                  Industrial <span style={{ color: '#F5A623' }}>Coatings.</span>
                </h2>
                <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
                  Durable coating solutions for infrastructure, manufacturing, oil &amp; gas, and energy sectors. Engineered to withstand extreme conditions and extend the life of your assets.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {industrialProducts.map((p, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border bg-white hover:shadow-[0_8px_40px_rgba(26,50,114,0.12)] transition-all duration-300 overflow-hidden flex flex-col"
                  style={{ borderColor: 'rgba(26,50,114,0.12)' }}
                >
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }} />
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                      style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-sans font-black text-lg sm:text-xl leading-tight" style={{ color: '#1A3272' }}>{p.name}</h3>
                    <p className="font-sans text-sm leading-relaxed mt-3 flex-1" style={{ color: '#8899AE' }}>{p.description}</p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold mt-5 hover:gap-3 transition-all"
                      style={{ color: '#1A3272' }}
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
            <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Need help choosing the <span className="text-blue">right product?</span>
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base mt-4 leading-relaxed">
              Our technical team will advise on the best coating system for your specific application and environment.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-blue text-white rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
            >
              TALK TO US <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
