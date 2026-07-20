import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import PaintStrokeDivider from '@/components/PaintStrokeDivider'

const cards = [
  {
    image: '/marine-coatings.webp',
    heading: 'Marine Coatings',
    body: 'Specialising in anti-fouling, hull protection, and topside finishes, our marine coatings expertise keeps vessels performing at their peak in East African waters. We supply and support shipyards, vessel operators, and port facilities across the region.',
    href: '/products#marine',
    label: 'View Marine Products',
  },
  {
    image: '/industrial-coatings.webp',
    heading: 'Industrial Coatings',
    body: 'From protective coatings for heavy machinery to anti-corrosion solutions for critical infrastructure, we deliver Hempel\'s world-class industrial product range across Kenya and East Africa. Our expert team ensures every application meets global performance standards.',
    href: '/products#industrial',
    label: 'View Industrial Products',
  },
]

export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#07111F] to-[#0D1B45]" />
      {/* Warm gold glow */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>WHAT WE DO</p>
        </div>
        <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(28px, 5.5vw, 60px)' }}>
          Expertise Built<br /><span style={{ color: '#F5A623' }}>on Results.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
          {cards.map((card) => (
            <div
              key={card.heading}
              className="group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,166,35,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              {/* Full-width image */}
              <div className="relative w-full h-52 sm:h-60 lg:h-64 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.heading}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gold accent line */}
              <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(245,166,35,0.1))' }} />

              {/* Card body */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col flex-1" style={{ background: '#F8F7F5' }}>
                <h3 className="font-sans font-black text-navy" style={{ fontSize: 'clamp(20px, 3vw, 30px)' }}>
                  {card.heading}
                </h3>
                <p className="font-sans text-sm sm:text-[15px] leading-relaxed mt-3 sm:mt-4 flex-1" style={{ color: '#6B7A99' }}>
                  {card.body}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold tracking-widest uppercase cursor-pointer hover:gap-4 transition-all duration-200"
                  style={{ color: '#F5A623' }}
                >
                  {card.label} <ArrowRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <PaintStrokeDivider />

        {/* Mission */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#6B7A99' }}>OUR MISSION</p>
            <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <h3 className="font-sans font-black text-white leading-tight" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            To be East Africa&apos;s most trusted coatings partner — delivering superior{' '}
            <span className="text-blue">Hempel products</span>, technical expertise, and{' '}
            <span style={{ color: '#F5A623' }}>unmatched client service</span>, every time.
          </h3>
        </div>
      </div>
    </section>
  )
}
