'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Download, FileText, ShieldCheck, ClipboardList } from 'lucide-react'

interface FeaturedProps {
  name: string
  code: string | null
  tag: string
  category: string
  description: string
  image_url: string | null
  images?: Array<{ url: string; alt: string }>
  slug: string | null
  product_data_sheet_url: string | null
  safety_data_sheet_url: string | null
  application_instruction_url: string | null
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim()
}

export default function FeaturedProduct(p: FeaturedProps) {
  const allImages: Array<{ url: string; alt: string }> = []
  if (p.images && p.images.length > 0) {
    allImages.push(...p.images)
  } else if (p.image_url) {
    allImages.push({ url: p.image_url, alt: p.name })
  }

  const [idx, setIdx] = useState(0)
  const current = allImages[idx]
  const isMarine = p.category === 'marine'

  const docs = [
    { url: p.product_data_sheet_url, label: 'Product Data Sheet', icon: <FileText size={13} /> },
    { url: p.safety_data_sheet_url, label: 'Safety Data Sheet', icon: <ShieldCheck size={13} /> },
    { url: p.application_instruction_url, label: 'Application Instructions', icon: <ClipboardList size={13} /> },
  ].filter(d => d.url)

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: isMarine ? 'linear-gradient(135deg, #060F20 0%, #0B1D3C 60%, #060F20 100%)' : 'linear-gradient(135deg, #F8F9FB 0%, #EEF2F8 100%)' }} />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${isMarine ? 'rgba(245,166,35,0.06)' : 'rgba(0,112,192,0.05)'} 0%, transparent 70%)`, filter: 'blur(50px)' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${isMarine ? 'rgba(0,112,192,0.05)' : 'rgba(245,166,35,0.04)'} 0%, transparent 70%)`, filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Featured Product</p>
          <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — info */}
          <div className="order-2 lg:order-1">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(0,112,192,0.15)', color: '#0070C0' }}>
                {p.tag}
              </span>
              {p.code && (
                <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest"
                  style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623' }}>
                  {p.code}
                </span>
              )}
            </div>

            {/* Name */}
            <h2 className="font-sans font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: isMarine ? '#ffffff' : '#1A2B5E' }}>
              {p.name}
            </h2>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base leading-relaxed mb-7 max-w-lg line-clamp-4"
              style={{ color: isMarine ? 'rgba(255,255,255,0.55)' : '#6B7A99' }}>
              {stripHtml(p.description)}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 mb-7 flex-wrap">
              {p.slug ? (
                <a href={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black tracking-widest uppercase cursor-pointer transition-all hover:brightness-110"
                  style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 24px rgba(245,166,35,0.25)' }}>
                  View Product <ArrowRight size={15} />
                </a>
              ) : null}
              <a href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                style={{
                  background: 'transparent',
                  color: isMarine ? 'rgba(255,255,255,0.65)' : '#475569',
                  border: `1px solid ${isMarine ? 'rgba(255,255,255,0.15)' : 'rgba(26,43,94,0.15)'}`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#F5A623'; (e.currentTarget as HTMLElement).style.color = '#F5A623' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isMarine ? 'rgba(255,255,255,0.15)' : 'rgba(26,43,94,0.15)'; (e.currentTarget as HTMLElement).style.color = isMarine ? 'rgba(255,255,255,0.65)' : '#475569' }}>
                Get a Quote <ArrowRight size={14} />
              </a>
            </div>

            {/* Downloads */}
            {docs.length > 0 && (
              <div className="rounded-xl p-4" style={{
                background: isMarine ? 'rgba(255,255,255,0.04)' : 'rgba(0,112,192,0.03)',
                border: `1px solid ${isMarine ? 'rgba(255,255,255,0.07)' : 'rgba(26,43,94,0.08)'}`,
              }}>
                <div className="flex items-center gap-1.5 mb-3">
                  <Download size={10} style={{ color: isMarine ? 'rgba(245,166,35,0.7)' : '#9CAABB' }} />
                  <p className="font-mono text-[9px] uppercase tracking-[2.5px]" style={{ color: isMarine ? 'rgba(245,166,35,0.7)' : '#9CAABB' }}>
                    Product Downloads
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {docs.map(d => (
                    <a key={d.label} href={d.url!} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={isMarine
                        ? { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)' }
                        : { background: '#ffffff', color: '#1A2B5E', border: '1px solid rgba(26,43,94,0.10)' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        if (isMarine) { el.style.background = 'rgba(245,166,35,0.10)'; el.style.color = '#F5A623'; el.style.borderColor = 'rgba(245,166,35,0.25)' }
                        else { el.style.background = '#EFF6FF'; el.style.color = '#0070C0'; el.style.borderColor = 'rgba(0,112,192,0.2)' }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        if (isMarine) { el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = 'rgba(255,255,255,0.7)'; el.style.borderColor = 'rgba(255,255,255,0.08)' }
                        else { el.style.background = '#ffffff'; el.style.color = '#1A2B5E'; el.style.borderColor = 'rgba(26,43,94,0.10)' }
                      }}>
                      <span className="flex items-center gap-2">{d.icon}{d.label}</span>
                      <Download size={11} className="opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — image gallery */}
          <div className="order-1 lg:order-2">
            {allImages.length > 0 ? (
              <div>
                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={current.url}
                    alt={current.alt}
                    fill
                    className="object-contain p-6"
                    priority
                  />
                  {/* Prev/next */}
                  {allImages.length > 1 && (
                    <>
                      <button type="button"
                        onClick={() => setIdx(i => (i - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all"
                        style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.5)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)' }}>
                        <ChevronLeft size={18} />
                      </button>
                      <button type="button"
                        onClick={() => setIdx(i => (i + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all"
                        style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.5)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)' }}>
                        <ChevronRight size={18} />
                      </button>
                      {/* Dot counter */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {allImages.map((_, i) => (
                          <button key={i} type="button" onClick={() => setIdx(i)}
                            className="rounded-full cursor-pointer transition-all"
                            style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? '#F5A623' : 'rgba(255,255,255,0.4)' }} />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {allImages.map((img, i) => (
                      <button key={i} type="button" onClick={() => setIdx(i)}
                        className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white cursor-pointer transition-all"
                        style={{ border: `2px solid ${i === idx ? '#F5A623' : 'transparent'}`, opacity: i === idx ? 1 : 0.55 }}>
                        <Image src={img.url} alt={img.alt} width={64} height={64} className="w-full h-full object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>No image</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
