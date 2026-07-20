import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Star, Truck, Leaf, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Team from '@/components/sections/Team'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Clin Corp Limited — a leading provider of high performance protective coatings and industrial solutions in East Africa. Authorised distributor of Hempel products.',
}

const values = [
  { title: 'Integrity', body: 'We conduct our business with honesty, transparency and professionalism.', color: '#0070C0' },
  { title: 'Quality', body: 'We are committed to delivering the highest quality in everything we do.', color: '#F5A623' },
  { title: 'Safety', body: 'We promote a safety-first culture in all our operations.', color: '#00D4B4' },
  { title: 'Innovation', body: 'We embrace innovation to provide better solutions for our clients.', color: '#0070C0' },
  { title: 'Teamwork', body: 'We believe in the power of partnership and working together for success.', color: '#F5A623' },
]

const whyUs = [
  'Authorised HEMPEL Distributor',
  'World-class Quality Products',
  'Experienced & Certified Team',
  'Reliable Supply & Delivery',
  'Customer-Focused Service',
]

const pillars = [
  { icon: Star, label: 'Quality Products' },
  { icon: ShieldCheck, label: 'Technical Expertise' },
  { icon: Truck, label: 'Reliable Delivery' },
  { icon: Leaf, label: 'Lasting Protection' },
]

const partners = [
  { name: 'Kenya Ports Authority', logo: '/partners/kenya-ports-authority.png' },
  { name: 'Kenya Shipyards Limited', logo: '/partners/kenya-shipyards.png' },
  { name: 'Ministry of Defence', logo: '/partners/ministry-of-defence.png' },
  { name: 'Tilenga Project in Uganda', logo: '/partners/tilenga-project.png' },
]

const stats = [
  { value: '37%', label: 'East Africa Market Share', color: '#F5A623' },
  { value: '2+', label: 'Years Operating', color: '#0070C0' },
  { value: 'EA', label: 'Regional Coverage', color: '#00D4B4' },
  { value: '100%', label: 'Hempel Authorized', color: '#1A2B5E' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#040D1A' }} className="text-white">

        {/* ── Hero ── */}
        <section className="relative min-h-[65vh] overflow-hidden flex items-center">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,112,192,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.09) 0%, transparent 70%)', filter: 'blur(80px)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center w-full">

              {/* Left — text */}
              <div>
                {/* Eyebrow badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-5 sm:mb-7"
                  style={{
                    fontSize: 'clamp(9px, 2vw, 11px)',
                    borderColor: 'rgba(245,166,35,0.35)',
                    background: 'rgba(245,166,35,0.08)',
                    color: '#F5A623',
                    letterSpacing: '2px',
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5A623' }} />
                  About Clin Corp · East Africa
                </div>

                {/* Headline */}
                <h1 className="font-sans font-black text-white leading-[0.95]">
                  <span className="block" style={{ fontSize: 'clamp(26px, 3.8vw, 52px)' }}>
                    Protecting Assets.
                  </span>
                  <span className="block mt-2" style={{ fontSize: 'clamp(20px, 2.8vw, 38px)' }}>
                    <span style={{ color: '#0070C0' }}>Delivering</span> Excellence.
                  </span>
                </h1>

                <p className="font-sans font-black mt-3 leading-snug" style={{ fontSize: 'clamp(17px, 2.2vw, 24px)', color: '#F5A623' }}>
                  Building the Future.
                </p>

                <p className="font-sans text-sm sm:text-base mt-5 sm:mt-7 max-w-xl leading-relaxed" style={{ color: '#8899AE' }}>
                  Your trusted partner in protective coatings &amp; solutions across East Africa.
                </p>

                <div className="w-14 h-0.5 mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
              </div>

              {/* Right — hero image */}
              <div className="hidden lg:block w-full">
                <Image
                  src="/about-hero.jpg"
                  alt="Ship hull coating at dry dock"
                  width={640}
                  height={480}
                  className="w-full object-cover"
                  style={{ borderRadius: '20px', maxHeight: '340px' }}
                  priority
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0, #00D4B4)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>WHO WE ARE</p>
                </div>
                <h2 className="font-sans font-black leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A2B5E' }}>
                  East Africa&apos;s Leading<br /><span style={{ color: '#0070C0' }}>Coatings Partner.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-5" style={{ color: '#6B7A99' }}>
                  Clin Corp Limited is a leading provider of high performance protective coatings and industrial solutions in East Africa. As the authorised distributor of HEMPEL products, we deliver world-class coatings, technical expertise and reliable service that protect assets, extend life and enhance performance.
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    { label: 'Our Mission', text: "To deliver innovative coating solutions and exceptional service that protect our clients' assets and create value." },
                    { label: 'Our Vision', text: 'To be the most trusted partner in protective coatings and solutions in East Africa.' },
                    { label: 'Our Purpose', text: 'Protecting today, improving tomorrow and building a better future.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: '#F5A623' }} />
                      <div>
                        <p className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>{item.label}</p>
                        <p className="font-sans text-sm leading-relaxed mt-1" style={{ color: '#6B7A99' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl p-5 sm:p-7 border bg-white hover:shadow-[0_4px_24px_rgba(26,43,94,0.08)] transition-all duration-300" style={{ borderColor: 'rgba(26,43,94,0.09)' }}>
                    <span className="font-sans font-black block leading-none" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: stat.color }}>{stat.value}</span>
                    <span className="font-sans text-xs uppercase tracking-widest mt-2 block" style={{ color: '#8899AE' }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pillars strip ── */}
        <section className="py-10 sm:py-12" style={{ background: '#1A2B5E' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {pillars.map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <p.icon size={20} style={{ color: '#F5A623' }} className="shrink-0" />
                  <span className="font-sans font-bold text-white text-sm sm:text-base">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hempel Partnership ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>OUR PRINCIPAL</p>
                </div>
                <h2 className="font-sans font-black leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A2B5E' }}>
                  Powered by <span style={{ color: '#0070C0' }}>Hempel.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-5" style={{ color: '#6B7A99' }}>
                  We proudly distribute the full range of HEMPEL high performance coatings and systems — trusted since 1915. Our authorization means every product is genuine, certified, and backed by Hempel&apos;s global technical support network.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {['Marine Coatings', 'Protective Coatings', 'Industrial Coatings', 'Flooring Solutions', 'Passive Fire Protection', 'Yacht Coatings', 'Thinners & Ancillaries'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#1A2B5E' }}>
                      <CheckCircle2 size={15} style={{ color: '#F5A623' }} className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-8">
                  <a href="https://www.hempel.com/en/products" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-black tracking-widest uppercase cursor-pointer transition-all duration-200" style={{ background: '#F5A623', color: '#0D1B4B' }}>
                    Hempel Products <ArrowRight size={14} />
                  </a>
                  <a href="https://www.hempel.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-200 hover:opacity-80" style={{ border: '1px solid rgba(26,43,94,0.20)', color: '#1A2B5E' }}>
                    Hempel Global <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 sm:p-10 text-center" style={{ border: '1px solid rgba(245,166,35,0.15)', boxShadow: '0 8px 40px rgba(26,43,94,0.08)' }}>
                  <Image src="/hempel-distributor.jpg" alt="Official Hempel Authorized Distributor" width={200} height={150} className="object-contain mx-auto" />
                  <p className="font-sans text-center text-xs font-semibold mt-4" style={{ color: '#8899AE' }}>Authorised Distributor · Trusted Since 1915</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us + Values ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }} />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>WHY CHOOSE US</p>
                </div>
                <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
                  The Clin Corp <span style={{ color: '#F5A623' }}>Promise.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base mt-4 leading-relaxed max-w-lg" style={{ color: '#6B7A99' }}>
                  Quality products. Technical expertise. Reliable delivery. Lasting protection. That is the Clin Corp promise.
                </p>
                <ul className="mt-8 space-y-4">
                  {whyUs.map((item, i) => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: i % 2 === 0 ? 'rgba(245,166,35,0.10)' : 'rgba(0,112,192,0.12)' }}>
                        <CheckCircle2 size={15} style={{ color: i % 2 === 0 ? '#F5A623' : '#0070C0' }} />
                      </div>
                      <span className="font-sans font-semibold text-white text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#6B7A99' }}>OUR VALUES</p>
                </div>
                <h2 className="font-sans font-black text-white mb-6" style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
                  What We <span style={{ color: '#0070C0' }}>Stand For.</span>
                </h2>
                <div className="space-y-3">
                  {values.map((v) => (
                    <div key={v.title} className="rounded-xl p-5 border border-white/[0.07] hover:border-white/20 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: v.color }} />
                        <div>
                          <h3 className="font-sans font-black text-white text-sm sm:text-base">{v.title}</h3>
                          <p className="font-sans text-sm leading-relaxed mt-1" style={{ color: '#6B7A99' }}>{v.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Valued Customers & Partners ── */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0, #00D4B4)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>TRUSTED BY</p>
                <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              </div>
              <h2 className="font-sans font-black" style={{ fontSize: 'clamp(24px, 4vw, 46px)', color: '#1A2B5E' }}>
                Our Valued Customers <span style={{ color: '#0070C0' }}>&amp; Partners.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border flex items-center justify-center p-6 sm:p-8 hover:shadow-[0_8px_32px_rgba(26,43,94,0.09)] hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
                  style={{ borderColor: 'rgba(26,43,94,0.09)', minHeight: '130px', background: '#edeef0' }}
                >
                  {/* Foreground logo — 10% bigger: 160→176, 80→88 */}
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={176}
                    height={88}
                    className="object-contain"
                    style={{ maxHeight: '88px', width: 'auto' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <Team />

        {/* ── Contact strip ── */}
        <section className="py-12 sm:py-16 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: MapPin, label: 'Address', value: 'Britam Towers, Hospital Road, Upper Hill, Nairobi, Kenya', href: null, iconColor: '#1A2B5E', iconBg: 'rgba(26,43,94,0.07)' },
                { icon: Phone, label: 'Phone', value: '+254 723 887 417', href: 'tel:+254723887417', iconColor: '#F5A623', iconBg: 'rgba(245,166,35,0.10)' },
                { icon: Mail, label: 'Email', value: 'clin@clincorps.com', href: 'mailto:clin@clincorps.com', iconColor: '#1A2B5E', iconBg: 'rgba(26,43,94,0.07)' },
                { icon: ShieldCheck, label: 'Authorized', value: 'Hempel Distributor · East Africa', href: null, iconColor: '#F5A623', iconBg: 'rgba(245,166,35,0.10)' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.iconBg }}>
                    <item.icon size={15} style={{ color: item.iconColor }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-sans font-semibold text-sm mt-0.5 hover:text-blue transition-colors duration-200 cursor-pointer" style={{ color: '#1A2B5E' }}>{item.value}</a>
                    ) : (
                      <p className="font-sans font-semibold text-sm mt-0.5" style={{ color: '#1A2B5E' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 sm:py-20 lg:py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #040D1A, #0D1B45, #040D1A)' }} />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <p className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#6B7A99' }}>WORK WITH US</p>
              <div className="h-px w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(26px, 4vw, 46px)' }}>
              Ready to Work <span style={{ color: '#F5A623' }}>With Us?</span>
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#6B7A99' }}>
              Talk to our team about your coating requirements and get a tailored solution for your project.
            </p>
            <a href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200" style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.25)' }}>
              GET IN TOUCH <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
