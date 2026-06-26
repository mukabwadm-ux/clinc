'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ShieldCheck } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#0D1B45] to-[#040D1A]" />

      {/* Large cyan glow — top left */}
      <div
        className="absolute -top-20 -left-40 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Gold glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* Subtle diagonal grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,174,239,0.05) 0px, rgba(0,174,239,0.05) 1px, transparent 1px, transparent 80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">

          {/* ── Left: text ── */}
          <div>
            {/* Eyebrow badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue/40 bg-blue/10 text-blue text-xs tracking-[2px] uppercase font-sans transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0.05s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse shrink-0" />
              Authorized Hempel Distributor · East Africa
            </div>

            {/* Headline */}
            <h1 className="mt-6 font-sans font-black leading-[0.92] text-white" style={{ fontSize: 'clamp(38px, 5.5vw, 76px)' }}>
              <span
                className={`block transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.15s' }}
              >
                CLIN-CORP.
              </span>
              <span
                className={`block text-blue transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.3s' }}
              >
                FUTURE
              </span>
              <span
                className={`block transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.45s' }}
              >
                <span className="hero-underline">TODAY.</span>
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={`text-slate text-base lg:text-lg mt-6 font-sans leading-relaxed max-w-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              Kenya&apos;s leading distributor of Hempel Industrial &amp; Marine Coatings.
              Protecting infrastructure, vessels, and assets across East Africa since 2024.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0.75s' }}
            >
              <a
                href="#expertise"
                className="inline-flex items-center justify-center bg-blue text-white rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
              >
                EXPLORE SOLUTIONS
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-white/30 text-white bg-white/5 hover:bg-white hover:text-navy rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all backdrop-blur-sm"
              >
                GET A QUOTE
              </a>
            </div>

            {/* Trust strip */}
            <div
              className={`flex items-center gap-6 mt-10 pt-8 border-t border-white/10 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '0.9s' }}
            >
              <div className="text-center">
                <span className="font-sans font-black text-2xl text-gold block">37%</span>
                <span className="font-sans text-[10px] text-slate uppercase tracking-widest">Market Share</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="font-sans font-black text-2xl text-blue block">EA</span>
                <span className="font-sans text-[10px] text-slate uppercase tracking-widest">Coverage</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-teal shrink-0" size={20} />
                <div>
                  <span className="font-sans font-bold text-white text-sm block leading-tight">Official</span>
                  <span className="font-sans text-[10px] text-slate uppercase tracking-widest">Distributor</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: product imagery ── */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Glow behind card */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(0,174,239,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}
            />

            {/* Main product card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] w-full max-w-md">
              <Image
                src="/hempel-products.jpg"
                alt="Hempel Coatings Products"
                width={500}
                height={500}
                className="w-full object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/80 via-transparent to-transparent" />

              {/* Distributor badge at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-4">
                <div className="bg-white rounded-lg p-2 shrink-0">
                  <Image
                    src="/hempel-distributor.jpg"
                    alt="Official Hempel Distributor"
                    width={80}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-sans font-bold text-white text-sm leading-tight">Official Hempel</p>
                  <p className="font-sans text-blue text-xs tracking-widest uppercase">Authorized Distributor</p>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-4 -right-4 bg-navy/90 backdrop-blur-md border border-gold/30 rounded-xl px-5 py-3 shadow-xl">
              <span className="font-sans font-black text-3xl text-gold block leading-none">37%</span>
              <span className="font-sans text-[10px] text-slate uppercase tracking-widest mt-1 block">East Africa Market Share</span>
            </div>

            {/* Floating year card */}
            <div className="absolute -bottom-4 -left-4 bg-white/5 backdrop-blur-md border border-teal/30 rounded-xl px-5 py-3 shadow-xl">
              <span className="font-sans font-black text-2xl text-teal block leading-none">Est. 2024</span>
              <span className="font-sans text-[10px] text-slate uppercase tracking-widest mt-1 block">Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <span className="text-[10px] text-white/40 tracking-widest uppercase font-sans">SCROLL</span>
        <ChevronDown className="text-white/40 animate-bounce" size={18} />
      </div>
    </section>
  )
}
