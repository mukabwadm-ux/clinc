import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Tag, Beaker, Wrench, ShieldCheck, FileText, ClipboardList, Download } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase.from('products').select('name, description, category').eq('slug', slug).eq('is_active', true).single()
  if (!data) return { title: 'Product Not Found' }
  const desc = data.description.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim().slice(0, 160)
  return {
    title: `${data.name} | ${data.category === 'marine' ? 'Marine' : 'Industrial'} Coating`,
    description: `${data.name} — ${desc}. Available in Kenya via Clincorps.`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const { data: p } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!p) notFound()

  const isMarine = p.category === 'marine'
  const sectionHref = `/products#${isMarine ? 'marine' : 'industrial'}`
  const sectionLabel = isMarine ? 'Marine Coatings' : 'Industrial Coatings'

  // Image priority: featured_image_url → images[0] → image_url
  const images: Array<{ url: string; alt: string }> = Array.isArray(p.images) ? p.images : []
  const primaryImage = p.featured_image_url || images[0]?.url || p.image_url || null
  const primaryAlt   = p.featured_image_alt  || images[0]?.alt || p.name

  const docs = [
    { url: p.product_data_sheet_url,       label: 'Product Data Sheet',      icon: <FileText size={14} /> },
    { url: p.safety_data_sheet_url,        label: 'Safety Data Sheet',       icon: <ShieldCheck size={14} /> },
    { url: p.application_instruction_url,  label: 'Application Instructions',icon: <ClipboardList size={14} /> },
  ].filter(d => d.url)

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
            <a href={sectionHref} className="hover:text-gold transition-colors duration-200 cursor-pointer">{sectionLabel}</a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span className="text-white">{p.name}</span>
          </div>
        </div>

        {/* ── Product hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">

            {/* Image column */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-full rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-8 sm:p-12 bg-white" style={{ minHeight: 260 }}>
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={primaryAlt}
                    width={280}
                    height={280}
                    className="object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-44 h-44 rounded-xl flex items-center justify-center" style={{ background: '#F1F5F9' }}>
                    <p className="text-xs font-semibold" style={{ color: '#CBD5E1' }}>No image</p>
                  </div>
                )}
              </div>

              {/* Thumbnail strip for additional images */}
              {images.length > 1 && (
                <div className="flex gap-2 w-full overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <div key={i} className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
                      <Image src={img.url} alt={img.alt} width={56} height={56} className="object-contain" />
                    </div>
                  ))}
                </div>
              )}

              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200"
                style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 24px rgba(245,166,35,0.28)' }}
              >
                GET A QUOTE <ArrowRight size={15} />
              </a>

              {/* Downloads */}
              {docs.length > 0 && (
                <div className="w-full rounded-xl p-4" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Download size={10} style={{ color: 'rgba(245,166,35,0.7)' }} />
                    <p className="font-mono text-[9px] uppercase tracking-[2.5px]" style={{ color: 'rgba(245,166,35,0.7)' }}>Product Downloads</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {docs.map(d => (
                      <a
                        key={d.label}
                        href={d.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(245,166,35,0.10)'; el.style.color = '#F5A623'; el.style.borderColor = 'rgba(245,166,35,0.25)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = 'rgba(255,255,255,0.75)'; el.style.borderColor = 'rgba(255,255,255,0.08)' }}
                      >
                        <span className="flex items-center gap-2">{d.icon}{d.label}</span>
                        <Download size={11} className="opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust badge */}
              <div className="w-full rounded-xl p-4 flex items-center gap-3" style={{ border: '1px solid rgba(245,166,35,0.15)', background: 'rgba(245,166,35,0.04)' }}>
                <ShieldCheck size={18} style={{ color: '#F5A623' }} className="shrink-0" />
                <div>
                  <p className="font-sans font-bold text-white text-xs">Genuine Hempel Product</p>
                  <p className="font-sans text-[11px] mt-0.5" style={{ color: '#6B7A99' }}>Supplied by Authorized Distributor</p>
                </div>
              </div>
            </div>

            {/* Details column */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,112,192,0.15)', color: '#0070C0' }}>
                  <Tag size={10} /> {p.tag}
                </span>
                {p.code && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
                    {p.code}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest" style={{ background: 'rgba(0,212,180,0.10)', color: '#00D4B4' }}>
                  {isMarine ? 'Marine' : 'Industrial'}
                </span>
              </div>

              {/* Name */}
              <h1 className="font-sans font-black text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}>
                {p.name}
              </h1>

              <div className="w-12 h-0.5 mt-4 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

              {/* Description */}
              <div className="space-y-4">
                <div className="rounded-2xl p-6 sm:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,112,192,0.15)' }}>
                      <Beaker size={15} className="text-blue" />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Description</h2>
                  </div>
                  <div
                    className="font-sans text-sm sm:text-[15px] leading-relaxed prose prose-invert prose-sm max-w-none [&_h2]:text-white [&_h2]:font-black [&_h2]:text-base [&_h3]:text-white [&_h3]:font-bold [&_h3]:text-sm [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1 [&_p]:mb-2"
                    style={{ color: '#6B7A99' }}
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  />
                </div>

                <div className="rounded-2xl p-6 sm:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.12)' }}>
                      <Wrench size={15} style={{ color: '#F5A623' }} />
                    </div>
                    <h2 className="font-sans font-black text-white text-base sm:text-lg">Contact Us</h2>
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed mb-4" style={{ color: '#6B7A99' }}>
                    Interested in {p.name}? Our technical team is ready to advise on surface preparation, application methods, and the right coating system for your specific environment.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-200"
                    style={{ color: '#F5A623' }}
                  >
                    Get in Touch <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Back link ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
          <a
            href={sectionHref}
            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-200"
            style={{ color: '#F5A623' }}
          >
            <ArrowLeft size={14} /> Back to {sectionLabel}
          </a>
        </div>

      </main>
      <Footer />
    </>
  )
}
