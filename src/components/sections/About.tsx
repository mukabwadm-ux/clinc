'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
      {/* Warm gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

          {/* Left: text */}
          <div
            ref={ref}
            className={cn(
              'transition-all duration-700',
              inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            )}
          >
            {/* Overline */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>
                WHO WE ARE
              </p>
            </div>

            <h2 className="font-sans font-black text-navy leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}>
              Built on Expertise.<br />
              <span className="text-blue">Driven by Results.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed mt-5 sm:mt-6 max-w-lg" style={{ color: '#6B7A99' }}>
              Clincorps is Kenya&apos;s Authorized Distributor for Hempel Industrial and Marine
              Coatings, proudly serving East Africa from Nairobi since 2024. In under two years,
              we have captured <strong className="font-bold" style={{ color: '#1A2B5E' }}>37% market share</strong> across
              the region — built on a foundation of uncompromising quality, deep technical knowledge,
              and client-first service.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              {['Authorized Hempel Distributor', '37% Market Share', 'East Africa Coverage'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-[11px] font-semibold"
                  style={{ background: 'rgba(26,43,94,0.07)', color: '#1A2B5E', border: '1px solid rgba(26,43,94,0.12)' }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 font-semibold text-sm mt-7 sm:mt-8 cursor-pointer hover:gap-3 transition-all duration-200"
              style={{ color: '#0070C0' }}
            >
              Learn About Us <ArrowRight size={15} />
            </a>
          </div>

          {/* Right: brand image */}
          <div className="relative w-full max-w-[425px] sm:max-w-[500px] lg:max-w-full mx-auto">
            {/* Warm gold accent frame behind image */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl pointer-events-none"
              style={{ background: 'rgba(245,166,35,0.08)', border: '2px solid rgba(245,166,35,0.20)' }}
            />
            <Image
              src="/ccimage.jpeg"
              alt="Clincorps — Authorised Hempel Distributor"
              width={600}
              height={450}
              className="relative w-full h-auto rounded-2xl object-cover"
              style={{ boxShadow: '0 20px 60px rgba(26,43,94,0.14)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
