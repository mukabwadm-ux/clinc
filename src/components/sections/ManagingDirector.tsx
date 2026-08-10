import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import LinkedInIcon from '@/components/icons/LinkedInIcon'

export default function ManagingDirector() {
  return (
    <section className="py-14 sm:py-20 lg:py-28" style={{ background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">

          {/* Portrait */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-xs sm:max-w-sm">
            <div
              className="absolute -top-3 -left-3 w-20 h-20 rounded-tl-2xl pointer-events-none hidden sm:block"
              style={{ borderTop: '3px solid #F5A623', borderLeft: '3px solid #F5A623' }}
            />
            <div className="relative rounded-2xl overflow-hidden aspect-square shadow-[0_18px_50px_rgba(13,27,75,0.15)]">
              <Image
                src="/team/clinton-intro.jpg"
                alt="Clinton Ochieng, Managing Director of Clin Corp Limited"
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#0070C0' }}>
              Leadership
            </p>
            <h2 className="font-sans font-black mt-3" style={{ color: '#0D1B4B', fontSize: 'clamp(26px, 3.8vw, 44px)' }}>
              Meet Our <span style={{ color: '#F5A623' }}>Managing Director.</span>
            </h2>

            <p className="font-sans text-[15px] sm:text-base lg:text-lg leading-relaxed mt-6" style={{ color: '#2E3A4E' }}>
              Clin Corp Limited is led by Clinton Ochieng, an accomplished business leader with extensive
              experience in industrial and marine protective coatings, infrastructure projects, and strategic
              business development. Under his leadership, Clin Corp has become the authorized distributor of
              Hempel Industrial and Marine Coatings in Kenya while delivering world-class coating solutions
              across East Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
              <a
                href="/leadership"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-200 cursor-pointer hover:brightness-110"
                style={{ background: '#F5A623', color: '#0D1B4B' }}
              >
                Read His Profile
                <ArrowRight size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/clinton-ochieng/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
                style={{ border: '1px solid rgba(13,27,75,0.18)', color: '#0A66C2', background: 'white' }}
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
