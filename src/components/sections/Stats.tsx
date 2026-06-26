'use client'

import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import type { Stat } from '@/types'

const stats: Stat[] = [
  { value: 37, suffix: '%', label: 'Market Share', sublabel: 'East Africa' },
  { value: 2, suffix: '', label: 'Years to Lead', sublabel: 'East Africa' },
  { value: 2024, suffix: '', label: 'Year Founded', sublabel: 'Nairobi, Kenya' },
]

function StatBlock({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const count = useCountUp(stat.value, 2200, trigger)
  return (
    <div className="flex-1 flex flex-col items-center gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 py-8 sm:py-10">
      <span
        className="font-sans font-black leading-none"
        style={{ fontSize: 'clamp(44px, 10vw, 72px)', color: '#F5A623' }}
      >
        {count}{stat.suffix}
      </span>
      <span className="font-sans font-semibold text-[10px] sm:text-xs uppercase tracking-[3px] text-white/80 text-center">
        {stat.label}
      </span>
      <span className="font-sans text-[9px] sm:text-[10px] text-blue tracking-widest uppercase text-center">
        {stat.sublabel}
      </span>
    </div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView(0.3)

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B45] via-[#1A3272] to-[#0D1B45]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,174,239,0.12) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-blue/20">
          {stats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
