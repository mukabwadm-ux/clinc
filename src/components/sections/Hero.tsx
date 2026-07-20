'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ShieldCheck } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/Hempel.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay — dark left, open right */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(4,13,26,0.92) 0%, rgba(4,13,26,0.82) 38%, rgba(13,27,69,0.40) 62%, rgba(4,13,26,0.08) 100%)' }} />

      {/* Warm gold glow — bottom left corner */}
      <div
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />

      {/* Soft blue glow — top */}
      <div
        className="absolute -top-10 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,112,192,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 pb-16">
        <div className="w-full max-w-3xl">

          {/* Eyebrow badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              transitionDelay: '0.05s',
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
            Authorized Hempel Distributor · East Africa
          </div>

          {/* Headline */}
          <h1 className="mt-5 sm:mt-7 font-sans font-black leading-[0.92] text-white" style={{ fontSize: 'clamp(40px, 5.8vw, 80px)' }}>
            <span
              className={`block whitespace-nowrap transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.15s' }}
            >
              CLINCORP.
            </span>
            <span
              className={`block whitespace-nowrap transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.3s', fontSize: 'clamp(30px, 4.4vw, 61px)', marginTop: '10px' }}
            >
              <span style={{ color: '#0070C0' }}>FUTURE </span><span className="hero-underline">TODAY.</span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-sm sm:text-base lg:text-lg mt-5 sm:mt-7 font-sans leading-relaxed max-w-xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.55s', color: '#8899AE' }}
          >
            Kenya&apos;s leading distributor of Hempel Industrial &amp; Marine Coatings.
            Protecting infrastructure, vessels, and assets across East Africa since 2024.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-9 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.7s' }}
          >
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-lg px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-200 cursor-pointer"
              style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.30)' }}
            >
              OUR PRODUCTS
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer backdrop-blur-sm"
              style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
            >
              GET A QUOTE
            </a>
          </div>

          {/* Trust strip */}
          <div
            className={`flex flex-wrap items-center gap-x-6 gap-y-3 mt-9 sm:mt-11 pt-7 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.88s', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-center">
              <span className="font-sans font-black block" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#F5A623' }}>37%</span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Market Share</span>
            </div>
            <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="text-center">
              <span className="font-sans font-black block" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#0070C0' }}>16+</span>
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Projects Done</span>
            </div>
            <div className="w-px h-8 hidden sm:block" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} style={{ color: '#00D4B4' }} className="shrink-0" />
              <div>
                <span className="font-sans font-bold text-white text-sm block leading-tight">Official</span>
                <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Hempel Partner</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <span className="font-sans text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
        <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.35)' }} />
      </div>
    </section>
  )
}
