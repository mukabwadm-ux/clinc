'use client'

import { Ship, Factory, ShieldCheck, Headphones, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const solutions = [
  {
    Icon: Ship,
    title: 'Marine Coatings',
    body: 'Advanced coating systems for hull, deck, cargo, ballast tanks and marine structures.',
  },
  {
    Icon: Factory,
    title: 'Industrial Coatings',
    body: 'Protective solutions for steel structures, tanks, pipelines, equipment and machinery.',
  },
  {
    Icon: ShieldCheck,
    title: 'Protective Solutions',
    body: 'High performance coatings for long term protection in the most demanding environments.',
  },
  {
    Icon: Headphones,
    title: 'Technical Support',
    body: 'Expert technical advisory, specification support, site visits and after-sales service you can rely on.',
  },
]

export default function Credentials() {
  const { ref, inView } = useInView()

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
      <div className="absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,112,192,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">WHAT WE OFFER</p>
        <h2 className="font-sans font-black text-white mt-2 sm:mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
          Our <span className="text-blue">Solutions.</span>
        </h2>
        <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
          We provide a complete range of high performance coatings and tailored solutions for every industry.
        </p>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-10 sm:mt-12 lg:mt-14"
        >
          {solutions.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                'rounded-2xl border border-white/10 hover:border-blue/40 p-6 sm:p-8 transition-all duration-300 hover:bg-white/[0.06] group cursor-default',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{
                background: 'rgba(255,255,255,0.04)',
                transitionDelay: `${i * 0.12}s`,
                transitionDuration: '0.6s',
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(0,112,192,0.18)' }}
              >
                <s.Icon size={22} className="text-blue" strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="font-sans font-black text-white text-base sm:text-lg leading-snug">
                {s.title}
              </h3>

              {/* Body */}
              <p className="font-sans text-slate text-sm leading-relaxed mt-2">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex items-center gap-4">
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-white rounded-md px-7 py-3.5 text-sm font-bold tracking-widest uppercase transition-colors"
            style={{ background: '#0070C0' }}
          >
            ABOUT US <ArrowRight size={15} />
          </a>
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-blue text-sm font-semibold hover:gap-3 transition-all"
          >
            View Products <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
