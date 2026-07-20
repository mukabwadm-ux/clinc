import Image from 'next/image'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

const productLinks = [
  { label: 'Marine Coatings', href: '/products#marine' },
  { label: 'Industrial Coatings', href: '/products#industrial' },
  { label: 'View All Products', href: '/products' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Case Stories', href: '/case-stories' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative" style={{ background: '#040D1A' }}>
      {/* Background image — faint overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/footer%20bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.13,
        }}
      />

      {/* All content sits above the bg image */}
      <div className="relative z-10">

      {/* Gold top line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #F5A623 30%, #0070C0 70%, transparent)' }} />

      {/* CTA strip */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,112,192,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8">
            <div>
              <h3 className="font-sans font-black text-white" style={{ fontSize: 'clamp(20px, 3.5vw, 30px)' }}>
                Ready to protect your assets?
              </h3>
              <p className="font-sans text-sm mt-1" style={{ color: '#6B7A99' }}>
                Talk to our team about the right Hempel coating system for your project.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200"
              style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 24px rgba(245,166,35,0.25)' }}
            >
              GET IN TOUCH <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-12">

          {/* Brand column */}
          <div>
            <Image
              src="/clincorp_logo.png"
              alt="Clin-Corp"
              width={140}
              height={44}
              className="object-contain bg-white rounded-lg px-2 py-1 w-[120px] sm:w-[140px] h-auto"
            />
            <p className="font-sans text-sm mt-5 leading-relaxed max-w-xs" style={{ color: '#6B7A99' }}>
              Authorized Distributor for Hempel Industrial and Marine Coatings across Kenya and East Africa. Quality coatings, trusted service.
            </p>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest mt-4" style={{ color: 'rgba(245,166,35,0.7)' }}>
              Nairobi, Kenya · Est. 2024
            </p>
          </div>

          {/* Products */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[3px] mb-5" style={{ color: '#F5A623' }}>Products</p>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm transition-colors duration-200 cursor-pointer hover:text-gold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[3px] mb-5" style={{ color: '#F5A623' }}>Company</p>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm transition-colors duration-200 cursor-pointer hover:text-gold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[3px] mb-5" style={{ color: '#F5A623' }}>Contact</p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#F5A623' }} />
                <span className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Britam Towers, Hospital Road,<br />Upper Hill, Nairobi, Kenya
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="shrink-0" style={{ color: '#F5A623' }} />
                <a href="tel:+254723887417" className="font-sans text-sm transition-colors duration-200 cursor-pointer hover:text-gold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  +254 723 887 417
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="shrink-0" style={{ color: '#F5A623' }} />
                <a href="mailto:clin@clincorps.com" className="font-sans text-sm transition-colors duration-200 cursor-pointer hover:text-gold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  clin@clincorps.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
          <p className="font-sans text-[12px] sm:text-[13px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
            © {new Date().getFullYear()} Clin-Corp Limited. All rights reserved.
          </p>
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Authorized Hempel Distributor · East Africa
          </p>
        </div>
      </div>
      </div>{/* end relative z-10 wrapper */}
    </footer>
  )
}
