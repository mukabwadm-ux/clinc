import { ShieldCheck, Users, Truck, Leaf, MapPin } from 'lucide-react'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    body: 'World-class coating solutions you can trust.',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.08)',
  },
  {
    icon: Users,
    title: 'Expert Team',
    body: 'Experienced professionals delivering the right solution.',
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.10)',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    body: 'On time, every time, across East Africa.',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.08)',
  },
  {
    icon: Leaf,
    title: 'Sustainable Future',
    body: 'Committing to safety, quality & the environment.',
    iconColor: '#F5A623',
    iconBg: 'rgba(245,166,35,0.10)',
  },
  {
    icon: MapPin,
    title: 'Based in Nairobi',
    body: 'Proudly serving Kenya and East Africa.',
    iconColor: '#1A2B5E',
    iconBg: 'rgba(26,43,94,0.08)',
  },
]

export default function Stats() {
  return (
    <section className="bg-white" style={{ borderTop: '3px solid #F5A623', borderBottom: '1px solid rgba(26,43,94,0.07)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col items-center text-center px-4 sm:px-6 py-9 sm:py-11 gap-3 ${
                i === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center"
                style={{ background: p.iconBg }}
              >
                <p.icon size={24} style={{ color: p.iconColor }} strokeWidth={1.8} />
              </div>
              <p
                className="font-sans font-black uppercase tracking-wider leading-tight mt-1"
                style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: '#1A2B5E' }}
              >
                {p.title}
              </p>
              <p
                className="font-sans text-xs sm:text-[13px] leading-relaxed"
                style={{ color: '#8899AE' }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
