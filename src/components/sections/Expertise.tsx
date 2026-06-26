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
    <section id="expertise" className="relative overflow-hidden py-12 sm:py-16 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#07111F] to-[#0D1B45]" />
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">WHAT WE DO</p>
        <h2 className="font-sans font-black text-white mt-2 sm:mt-3" style={{ fontSize: 'clamp(28px, 5.5vw, 60px)' }}>
          Expertise Built<br /><span className="text-blue">on Results.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
          {cards.map((card) => (
            <div
              key={card.heading}
              className="group bg-white/[0.03] border border-blue/15 rounded-2xl p-6 sm:p-8 lg:p-12 hover:border-blue hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(0,174,239,0.12)] transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center group-hover:bg-blue/20 transition-colors">
                <card.icon size={24} className="text-blue sm:hidden" />
                <card.icon size={28} className="text-blue hidden sm:block" />
              </div>
              <h3 className="font-sans font-bold text-white mt-4 sm:mt-6" style={{ fontSize: 'clamp(20px, 3vw, 30px)' }}>
                {card.heading}
              </h3>
              <p className="font-sans text-sm sm:text-[15px] text-slate leading-relaxed mt-3 sm:mt-4">{card.body}</p>
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {card.achievements.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-xs sm:text-sm text-white/90 font-medium">
                    <span className="font-bold text-gold shrink-0">——</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <PaintStrokeDivider />

        {/* Mission */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-mono text-[10px] sm:text-[11px] text-slate uppercase tracking-[3px]">OUR MISSION</p>
          <h3 className="font-sans font-black text-white mt-3 sm:mt-4 leading-tight" style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
            To be East Africa&apos;s most trusted coatings partner — delivering superior{' '}
            <span className="text-blue">Hempel products</span>, technical expertise, and{' '}
            <span className="text-gold">unmatched client service</span>, every time.
          </h3>
        </div>
      </div>
    </section>
  )
}
