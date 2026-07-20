'use client'

import { Ship, Factory, ShieldCheck, Headphones, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const solutions = [
  {
    Icon: Ship,
    title: 'Marine Coatings',
    body: 'Advanced coating systems for hull, deck, cargo, ballast tanks and marine structures.',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.07)',
  },
  {
    Icon: Factory,
    title: 'Industrial Coatings',
    body: 'Protective solutions for steel structures, tanks, pipelines, equipment and machinery.',
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.10)',
  },
  {
    Icon: ShieldCheck,
    title: 'Protective Solutions',
    body: 'High performance coatings for long term protection in the most demanding environments.',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.07)',
  },
  {
    Icon: Headphones,
    title: 'Technical Support',
    body: 'Expert technical advisory, specification support, site visits and after-sales service you can rely on.',
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.10)',
  },
]

export default function Credentials() {
  const { ref, inView } = useInView()

  return (
    <section className="py-16 sm:py-20 lg:py-28 overflow-hidden" style={{ background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>WHAT WE OFFER</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 mb-10 sm:mb-14">
          <h2 className="font-sans font-black text-navy leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Our <span className="text-blue">Solutions.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed max-w-md sm:text-right" style={{ color: '#6B7A99' }}>
            A complete range of high performance coatings and tailored solutions for every industry.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6"
        >
          {solutions.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                'group rounded-2xl bg-white p-6 sm:p-8 transition-all duration-300 cursor-default',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{
                border: '1px solid rgba(26,43,94,0.09)',
                transitionDelay: `${i * 0.10}s`,
                transitionDuration: '0.6s',
                boxShadow: '0 1px 4px rgba(26,43,94,0.04)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,166,35,0.45)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(26,43,94,0.09)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,43,94,0.09)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(26,43,94,0.04)'
              }}
            >
              {/* Gold top accent on hover — using border-top */}
              <div
                className="w-8 h-0.5 mb-5 rounded-full"
                style={{ background: s.iconColor === '#F5A623' ? '#F5A623' : '#1A2B5E' }}
              />

              {/* Icon */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: s.iconBg }}
              >
                <s.Icon size={22} style={{ color: s.iconColor }} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="font-sans font-black text-navy text-base sm:text-lg leading-snug">
                {s.title}
              </h3>

              {/* Body */}
              <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#6B7A99' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4">
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-white rounded-lg px-7 py-3.5 text-sm font-black tracking-widest uppercase transition-all duration-200 cursor-pointer"
            style={{ background: '#0070C0', boxShadow: '0 0 20px rgba(0,112,192,0.20)' }}
          >
            ABOUT US <ArrowRight size={15} />
          </a>
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-200"
            style={{ color: '#F5A623' }}
          >
            View Products <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
