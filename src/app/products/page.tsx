import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Anchor, Factory } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import FeaturedProduct from '@/components/FeaturedProduct'
import QuoteButton from '@/components/QuoteButton'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Products',
  description: "Explore Clincorps's range of Hempel Industrial & Marine Coatings — anti-corrosion, anti-fouling, hull protection, and infrastructure coatings available in Kenya and East Africa.",
}

interface Product {
  id: string
  name: string
  code: string | null
  tag: string
  category: string
  description: string
  image_url: string | null
  images?: Array<{ url: string; alt: string }>
  slug: string | null
  is_active: boolean
  is_featured: boolean
  featured_image_url: string | null
  featured_image_alt: string | null
  product_data_sheet_url: string | null
  safety_data_sheet_url: string | null
  application_instruction_url: string | null
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim()
}

function ProductCard({ name, code, tag, description, image_url, images, featured_image_url, featured_image_alt, slug }: Product) {
  const primaryImage = featured_image_url || images?.[0]?.url || image_url
  const primaryAlt   = featured_image_alt  || images?.[0]?.alt || name
  const descText     = stripHtml(description)

  return (
    <div className="group rounded-2xl border border-white/[0.08] hover:border-gold/35 bg-white/[0.03] hover:shadow-[0_8px_36px_rgba(245,166,35,0.07)] transition-all duration-300 overflow-hidden flex flex-col cursor-default">
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(245,166,35,0.15))' }} />

      {primaryImage && (
        <div className="flex items-center justify-center px-8 pt-7 pb-4 bg-white rounded-b-none">
          <Image src={primaryImage} alt={primaryAlt} width={154} height={154} className="object-contain drop-shadow-xl" />
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
        <p className="font-sans text-sm leading-relaxed mt-3 flex-1 line-clamp-3" style={{ color: '#6B7A99' }}>{descText}</p>

        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/[0.06] flex-wrap">
          {slug ? (
            <a href={`/products/${slug}`} className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer" style={{ color: '#0D1B4B', background: '#F5A623' }}>
              View Product <ArrowRight size={13} />
            </a>
          ) : (
            <a href="/contact" className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer" style={{ color: '#0D1B4B', background: '#F5A623' }}>
              Enquire <ArrowRight size={13} />
            </a>
          )}
          <QuoteButton productName={name} variant="ghost" />
        </div>
      </div>
    </div>
  )
}


function IndustrialCard({ name, code, tag, description, images, image_url, featured_image_url, featured_image_alt, slug }: Product) {
  const primaryImage = featured_image_url || images?.[0]?.url || image_url
  const primaryAlt   = featured_image_alt  || images?.[0]?.alt || name
  const descText     = stripHtml(description)

  return (
    <div className="group rounded-2xl border bg-white hover:shadow-[0_8px_36px_rgba(26,43,94,0.09)] hover:border-gold/40 transition-all duration-300 overflow-hidden flex flex-col cursor-default" style={{ borderColor: 'rgba(26,43,94,0.09)' }}>
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(0,112,192,0.4))' }} />

      {primaryImage && (
        <div className="flex items-center justify-center px-8 pt-7 pb-4 bg-gray-50 rounded-b-none" style={{ borderBottom: '1px solid rgba(26,43,94,0.06)' }}>
          <Image src={primaryImage} alt={primaryAlt} width={154} height={154} className="object-contain drop-shadow-lg" />
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(245,166,35,0.10)', color: '#B45309' }}>
            {tag}
          </span>
          {code && (
            <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest" style={{ background: 'rgba(0,112,192,0.08)', color: '#0070C0' }}>
              {code}
            </span>
          )}
        </div>

        <h3 className="font-sans font-black text-lg sm:text-xl leading-tight" style={{ color: '#1A2B5E' }}>{name}</h3>
        <p className="font-sans text-sm leading-relaxed mt-3 flex-1 line-clamp-3" style={{ color: '#6B7A99' }}>{descText}</p>

        <div className="flex items-center gap-4 mt-5 pt-4 flex-wrap" style={{ borderTop: '1px solid rgba(26,43,94,0.06)' }}>
          {slug && (
            <a href={`/products/${slug}`} className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer" style={{ color: '#fff', background: '#0070C0' }}>
              View Product <ArrowRight size={13} />
            </a>
          )}
          <QuoteButton productName={name} variant="link" />
        </div>
      </div>
    </div>
  )
}

export default async function ProductsPage() {
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const products = allProducts ?? []
  const featuredProduct = products.find(p => p.is_featured) ?? null
  const marineProducts = products.filter(p => p.category === 'marine')
  const industrialProducts = products.filter(p => p.category === 'industrial')

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

        {/* ── Featured Product ── */}
        {featuredProduct && <FeaturedProduct {...featuredProduct} />}

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

            {marineProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {marineProducts.map(p => <ProductCard key={p.id} {...p} />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.06] py-14 text-center">
                <p className="font-sans text-sm" style={{ color: '#6B7A99' }}>Marine products coming soon.</p>
              </div>
            )}
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

            {industrialProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {industrialProducts.map(p => <IndustrialCard key={p.id} {...p} />)}
              </div>
            ) : (
              <div className="rounded-2xl border py-14 text-center" style={{ borderColor: 'rgba(26,43,94,0.09)' }}>
                <p className="font-sans text-sm" style={{ color: '#6B7A99' }}>Industrial products coming soon.</p>
              </div>
            )}
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
            <a href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200" style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.28)' }}>
              TALK TO OUR TEAM <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
