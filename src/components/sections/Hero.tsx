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
      {/* Dark navy overlay — keeps image visible but text readable */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(4,13,26,0.88) 0%, rgba(4,13,26,0.80) 35%, rgba(13,27,69,0.40) 60%, rgba(4,13,26,0.10) 100%)' }} />

      {/* Cyan glow — top left */}
      <div
        className="absolute -top-20 -left-40 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Gold glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 pb-16">
        <div className="w-full max-w-3xl">

          {/* Eyebrow badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue/40 bg-blue/10 backdrop-blur-sm text-blue tracking-[2px] uppercase font-sans transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.05s', fontSize: 'clamp(9px, 2vw, 12px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse shrink-0" />
            Authorized Hempel Distributor · East Africa
          </div>

          {/* Headline */}
          <h1 className="mt-4 sm:mt-6 font-sans font-black leading-[0.92] text-white" style={{ fontSize: 'clamp(38px, 5.5vw, 76px)' }}>
            <span
              className={`block whitespace-nowrap transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.15s' }}
            >
              CLINCORP.
            </span>
            <span
              className={`block whitespace-nowrap transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.3s', fontSize: 'clamp(29px, 4.219vw, 58px)', marginTop: '10px' }}
            >
              <span className="text-blue">FUTURE </span><span className="hero-underline">TODAY.</span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-slate text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 font-sans leading-relaxed max-w-xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            Kenya&apos;s leading distributor of Hempel Industrial &amp; Marine Coatings.
            Protecting infrastructure, vessels, and assets across East Africa since 2024.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0.75s' }}
          >
            <a
              href="/products"
              className="inline-flex items-center justify-center bg-blue text-white rounded-md px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
            >
              OUR PRODUCTS
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 text-white bg-white/5 hover:bg-white hover:text-navy rounded-md px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all backdrop-blur-sm"
            >
              GET A QUOTE
            </a>
          </div>

          {/* Trust strip */}
          <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-3 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.9s' }}
          >
            <div className="text-center">
              <span className="font-sans font-black text-xl sm:text-2xl text-gold block">37%</span>
              <span className="font-sans text-[9px] sm:text-[10px] text-slate uppercase tracking-widest">Market Share</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <span className="font-sans font-black text-xl sm:text-2xl text-blue block">EA</span>
              <span className="font-sans text-[9px] sm:text-[10px] text-slate uppercase tracking-widest">Coverage</span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-teal shrink-0" size={18} />
              <div>
                <span className="font-sans font-bold text-white text-sm block leading-tight">Official</span>
                <span className="font-sans text-[9px] sm:text-[10px] text-slate uppercase tracking-widest">Distributor</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <span className="text-[10px] text-white/40 tracking-widest uppercase font-sans">SCROLL</span>
        <ChevronDown className="text-white/40 animate-bounce" size={18} />
      </div>
    </section>
  )
}
