'use client'

import { GraduationCap, Trophy, Globe2 } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const credentials = [
  {
    Icon: GraduationCap,
    title: 'BBA — Marketing',
    body: 'Armed with a Bachelor of Business Administration in Marketing, our leadership brings deep commercial strategy and market development expertise to every client engagement and partnership.',
    accent: 'border-l-gold',
    hover: 'hover:border-l-blue',
  },
  {
    Icon: Trophy,
    title: 'SBS Leadership Excellence',
    body: 'Recognised by the Strathmore Business School for outstanding leadership capability, our team operates at the intersection of business acumen and industry expertise.',
    accent: 'border-l-blue',
    hover: 'hover:border-l-gold',
  },
  {
    Icon: Globe2,
    title: 'IFC / World Bank Certified',
    body: 'Certified through the International Finance Corporation and World Bank program, equipping us with global standards in business development, financial strategy, and enterprise growth.',
    accent: 'border-l-teal',
    hover: 'hover:border-l-gold',
  },
]

export default function Credentials() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-offwhite py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-[11px] text-slate uppercase tracking-[3px]">OUR CREDENTIALS</p>
        <h2 className="font-sans font-black text-4xl lg:text-5xl text-navy mt-3">
          A Foundation Built<br /><span className="text-blue">for Excellence.</span>
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {credentials.map((cred, i) => (
            <div
              key={cred.title}
              className={cn(
                `bg-white border-l-4 ${cred.accent} ${cred.hover} rounded-r-xl p-8 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default`,
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 0.15}s`, transitionDuration: '0.6s' }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center">
                <cred.Icon className="text-blue" size={24} />
              </div>
              <h3 className="font-sans font-bold text-xl text-navy mt-5">{cred.title}</h3>
              <p className="font-sans text-sm text-slate leading-relaxed mt-2">{cred.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
