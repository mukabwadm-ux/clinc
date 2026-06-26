'use client'

import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="bg-offwhite py-16 lg:py-28 relative overflow-hidden">
      {/* Warm cream top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623, #00D4B4)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-center">
          {/* Left: text content */}
          <div
            ref={ref}
            className={cn(
              'transition-all duration-700',
              inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            )}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue/40 bg-blue/10 text-blue text-xs font-semibold tracking-wider uppercase">
              Authorized Hempel Distributor
            </span>
            <p className="font-mono text-[11px] text-slate uppercase tracking-[3px] mt-4">
              WHO WE ARE
            </p>
            <h2 className="font-sans font-black text-4xl lg:text-5xl text-navy leading-tight mt-3">
              Built on Expertise.<br />
              <span className="text-blue">Driven by Results.</span>
            </h2>
            <p className="font-sans text-base text-slate leading-relaxed mt-6">
              Clin-Corp is Kenya&apos;s Authorized Distributor for Hempel Industrial and Marine
              Coatings, proudly serving East Africa from Nairobi since 2024. In under two years,
              we have captured <strong className="text-navy font-bold">37% market share</strong> across
              the region — built on a foundation of uncompromising quality, deep technical knowledge,
              and client-first service. From infrastructure and manufacturing to maritime industries,
              we deliver coating solutions engineered to last.
            </p>
            <a
              href="https://www.hempel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue font-semibold text-sm mt-6 hover:gap-3 transition-all"
            >
              Learn About Hempel <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: concentric circles with glow */}
          <div className="relative flex items-center justify-center w-full aspect-square max-w-[300px] mx-auto">
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.20) 0%, transparent 70%)', filter: 'blur(30px)' }}
            />
            <div className="absolute w-[280px] h-[280px] rounded-full border-[12px] border-navy animate-spin [animation-duration:30s]" />
            <div className="absolute w-[220px] h-[220px] rounded-full border-[10px] border-blue/20" />
            <div className="absolute w-[160px] h-[160px] rounded-full border-[10px] border-navy" />
            <div className="absolute w-[100px] h-[100px] rounded-full border-[10px] border-blue/20" />
            <div
              className="w-12 h-12 rounded-full shadow-[0_0_20px_rgba(0,212,180,0.6)]"
              style={{ background: 'linear-gradient(135deg, #00AEEF, #00D4B4)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
