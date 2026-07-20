'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="bg-offwhite py-12 sm:py-16 lg:py-28 relative overflow-hidden">
      {/* Warm top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623, #00D4B4)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left: text */}
          <div
            ref={ref}
            className={cn(
              'transition-all duration-700',
              inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            )}
          >
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full border border-blue/40 bg-blue/10 text-blue text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
              Authorized Hempel Distributor
            </span>
            <p className="font-mono text-[10px] sm:text-[11px] text-slate uppercase tracking-[3px] mt-3 sm:mt-4">
              WHO WE ARE
            </p>
            <h2 className="font-sans font-black text-navy leading-tight mt-2 sm:mt-3" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
              Built on Expertise.<br />
              <span className="text-blue">Driven by Results.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate leading-relaxed mt-4 sm:mt-6">
              Clin-Corp is Kenya&apos;s Authorized Distributor for Hempel Industrial and Marine
              Coatings, proudly serving East Africa from Nairobi since 2024. In under two years,
              we have captured <strong className="text-navy font-bold">37% market share</strong> across
              the region — built on a foundation of uncompromising quality, deep technical knowledge,
              and client-first service. From infrastructure and manufacturing to maritime industries,
              we deliver coating solutions engineered to last.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-blue font-semibold text-sm mt-5 sm:mt-6 hover:gap-3 transition-all"
            >
              Learn About Us <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: Clin Corp brand image */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] mx-auto">
            <Image
              src="/ccimage.jpeg"
              alt="Clin Corp — Authorised Hempel Distributor"
              width={460}
              height={340}
              className="w-full h-auto rounded-2xl shadow-[0_20px_60px_rgba(26,43,94,0.18)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
