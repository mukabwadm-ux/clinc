import { BarChart3, Globe } from 'lucide-react'
import PaintStrokeDivider from '@/components/PaintStrokeDivider'

const cards = [
  {
    icon: BarChart3,
    heading: 'Industrial Coatings',
    body: 'From protective coatings for heavy machinery to anti-corrosion solutions for critical infrastructure, we deliver Hempel\'s world-class industrial product range across Kenya and East Africa. Our expert team ensures every application meets global performance standards.',
    achievements: [
      '37% Market Share in East Africa',
      'Full Hempel Industrial Portfolio',
      'Trusted by Major Kenyan Industries',
    ],
  },
  {
    icon: Globe,
    heading: 'Marine Coatings',
    body: 'Specialising in anti-fouling, hull protection, and topside finishes, our marine coatings expertise keeps vessels performing at their peak in East African waters. We supply and support shipyards, vessel operators, and port facilities across the region.',
    achievements: [
      'Complete Marine Product Range',
      'Mombasa Port Coverage',
      'Certified Application Expertise',
    ],
  },
]

export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden py-16 lg:py-28">
      {/* Dark gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#07111F] to-[#0D1B45]" />

      {/* Cyan glow right */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      {/* Gold glow left */}
      <div
        className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-[11px] text-blue uppercase tracking-[3px]">WHAT WE DO</p>
        <h2 className="font-sans font-black text-5xl lg:text-6xl text-white mt-3">
          Expertise Built<br /><span className="text-blue">on Results.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {cards.map((card) => (
            <div
              key={card.heading}
              className="group bg-white/[0.03] border border-blue/15 rounded-2xl p-12 hover:border-blue hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(0,174,239,0.12)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center group-hover:bg-blue/20 transition-colors">
                <card.icon size={28} className="text-blue" />
              </div>
              <h3 className="font-sans font-bold text-3xl text-white mt-6">{card.heading}</h3>
              <p className="font-sans text-[15px] text-slate leading-relaxed mt-4">{card.body}</p>
              <ul className="mt-6 space-y-3">
                {card.achievements.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-white/90 font-medium">
                    <span className="font-bold text-gold">——</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <PaintStrokeDivider />

        {/* Mission block */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-[11px] text-slate uppercase tracking-[3px]">OUR MISSION</p>
          <h3 className="font-sans font-black text-[36px] leading-tight text-white mt-4">
            To be East Africa&apos;s most trusted coatings partner — delivering superior{' '}
            <span className="text-blue">Hempel products</span>, technical expertise, and{' '}
            <span className="text-gold">unmatched client service</span>, every time.
          </h3>
        </div>
      </div>
    </section>
  )
}
