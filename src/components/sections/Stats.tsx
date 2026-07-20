import { ShieldCheck, Users, Truck, Leaf, MapPin } from 'lucide-react'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    body: 'World-class coating solutions you can trust.',
    iconColor: '#1A3272',
  },
  {
    icon: Users,
    title: 'Expert Team',
    body: 'Experienced professionals delivering the right solution.',
    iconColor: '#B91C1C',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    body: 'On time, every time, across East Africa.',
    iconColor: '#1A3272',
  },
  {
    icon: Leaf,
    title: 'Sustainable Future',
    body: 'Committing to safety, quality & the environment.',
    iconColor: '#B91C1C',
  },
  {
    icon: MapPin,
    title: 'Based in Nairobi',
    body: 'Proudly serving Kenya and East Africa.',
    iconColor: '#1A3272',
  },
]

export default function Stats() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-200">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-10 gap-3 ${
                i === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-1"
                style={{ background: `${p.iconColor}15` }}
              >
                <p.icon size={26} style={{ color: p.iconColor }} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <p
                className="font-sans font-black uppercase tracking-wider leading-tight"
                style={{ fontSize: 'clamp(11px, 1.8vw, 13px)', color: '#1A3272' }}
              >
                {p.title}
              </p>

              {/* Description */}
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
