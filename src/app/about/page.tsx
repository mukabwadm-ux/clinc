import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Star, Truck, Leaf, MapPin, Ship, Factory, Shield, Headphones, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Team from '@/components/sections/Team'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Clin Corp Limited — a leading provider of high performance protective coatings and industrial solutions in East Africa. Authorised distributor of Hempel products.',
}

const solutions = [
  {
    icon: Ship,
    title: 'Marine Coatings',
    body: 'Advanced coating systems for hull, deck, cargo, ballast tanks and marine structures.',
  },
  {
    icon: Factory,
    title: 'Industrial Coatings',
    body: 'Protective solutions for steel structures, tanks, pipelines, equipment and machinery.',
  },
  {
    icon: Shield,
    title: 'Protective Solutions',
    body: 'High performance coatings for long term protection in the most demanding environments.',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    body: 'Expert technical advisory, specification support, site visits and after-sales service you can rely on.',
  },
]

const values = [
  {
    title: 'Integrity',
    body: 'We conduct our business with honesty, transparency and professionalism.',
    color: '#00AEEF',
  },
  {
    title: 'Quality',
    body: 'We are committed to delivering the highest quality in everything we do.',
    color: '#F5A623',
  },
  {
    title: 'Safety',
    body: 'We promote a safety-first culture in all our operations.',
    color: '#00D4B4',
  },
  {
    title: 'Innovation',
    body: 'We embrace innovation to provide better solutions for our clients.',
    color: '#00AEEF',
  },
  {
    title: 'Teamwork',
    body: 'We believe in the power of partnership and working together for success.',
    color: '#F5A623',
  },
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
  { name: 'Kenya Shipyards Limited', sub: 'Building Ships · Building Kenya' },
  { name: 'Kenya Ports Authority', sub: 'Valued Customer' },
  { name: 'Tilenga Project in Uganda', sub: 'Valued Customer' },
  { name: 'Ministry of Defence', sub: 'Republic of Kenya' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-dark text-white">

        {/* ── Hero ── */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#0D1B45] to-[#040D1A]" />
          <div className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.14) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 pt-32 sm:pt-36">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">ABOUT CLIN CORP</p>
            <h1 className="font-sans font-black text-white mt-2 sm:mt-3 leading-[0.95]" style={{ fontSize: 'clamp(36px, 6.5vw, 84px)' }}>
              Protecting Assets.<br />
              Delivering Excellence.<br />
              <span className="text-blue">Building the Future.</span>
            </h1>
            <p className="font-sans text-slate text-base sm:text-lg mt-5 max-w-2xl leading-relaxed">
              Your trusted partner in protective coatings &amp; solutions across East Africa.
            </p>
            <div className="w-16 h-0.5 mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }} />
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section className="bg-offwhite py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none" style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623, #00D4B4)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#8899AE' }}>WHO WE ARE</p>
                <h2 className="font-sans font-black leading-tight mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A3272' }}>
                  East Africa&apos;s Leading<br /><span style={{ color: '#00AEEF' }}>Coatings Partner.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-5" style={{ color: '#8899AE' }}>
                  Clin Corp Limited is a leading provider of high performance protective coatings and industrial solutions in East Africa. As the authorised distributor of HEMPEL products, we deliver world-class coatings, technical expertise and reliable service that protect assets, extend life and enhance performance.
                </p>

                {/* Mission / Vision / Purpose */}
                <div className="mt-8 space-y-5">
                  {[
                    { label: 'Our Mission', text: 'To deliver innovative coating solutions and exceptional service that protect our clients\' assets and create value.' },
                    { label: 'Our Vision', text: 'To be the most trusted partner in protective coatings and solutions in East Africa.' },
                    { label: 'Our Purpose', text: 'Protecting today, improving tomorrow and building a better future.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: '#00AEEF' }} />
                      <div>
                        <p className="font-sans font-black text-sm" style={{ color: '#1A3272' }}>{item.label}</p>
                        <p className="font-sans text-sm leading-relaxed mt-1" style={{ color: '#8899AE' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: '37%', label: 'East Africa Market Share', color: '#F5A623' },
                  { value: '2+', label: 'Years Operating', color: '#00AEEF' },
                  { value: 'EA', label: 'Regional Coverage', color: '#00D4B4' },
                  { value: '100%', label: 'Hempel Authorized', color: '#1A3272' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl p-5 sm:p-7 border" style={{ background: 'white', borderColor: 'rgba(0,174,239,0.12)' }}>
                    <span className="font-sans font-black block leading-none" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: stat.color }}>{stat.value}</span>
                    <span className="font-sans text-xs uppercase tracking-widest mt-2 block" style={{ color: '#8899AE' }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pillars strip ── */}
        <section className="py-10 sm:py-12" style={{ background: '#1A3272' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {pillars.map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <p.icon size={20} className="text-gold shrink-0" style={{ color: '#F5A623' }} />
                  <span className="font-sans font-bold text-white text-sm sm:text-base">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Solutions ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #07111F, #0D1B45, #07111F)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">WHAT WE OFFER</p>
            <h2 className="font-sans font-black text-white mt-2 sm:mt-3" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Our <span className="text-blue">Solutions.</span>
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              We provide a complete range of high performance coatings and tailored solutions for every industry.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
              {solutions.map((s) => (
                <div key={s.title} className="group rounded-2xl p-6 sm:p-8 border border-blue/10 hover:border-blue/40 hover:bg-white/[0.04] transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(0,174,239,0.2), rgba(26,50,114,0.3))' }}>
                    <s.icon size={20} className="text-blue" />
                  </div>
                  <h3 className="font-sans font-black text-white text-lg sm:text-xl">{s.title}</h3>
                  <p className="font-sans text-sm sm:text-[15px] text-slate leading-relaxed mt-3">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hempel Partnership ── */}
        <section className="bg-offwhite py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none" style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#8899AE' }}>OUR PRINCIPAL</p>
                <h2 className="font-sans font-black leading-tight mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A3272' }}>
                  Powered by <span style={{ color: '#00AEEF' }}>Hempel.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-5" style={{ color: '#8899AE' }}>
                  We proudly distribute the full range of HEMPEL high performance coatings and systems — trusted since 1915. Our authorization means every product is genuine, certified, and backed by Hempel&apos;s global technical support network.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {['Marine Coatings', 'Protective Coatings', 'Industrial Coatings', 'Flooring Solutions', 'Passive Fire Protection', 'Yacht Coatings', 'Thinners & Ancillaries'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: '#1A3272' }}>
                      <CheckCircle2 size={16} style={{ color: '#00AEEF' }} className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-8">
                  <a href="https://www.hempel.com/en/products" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue text-white rounded-md px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_20px_rgba(0,174,239,0.3)]" style={{ background: '#00AEEF' }}>
                    Hempel Products <ArrowRight size={14} />
                  </a>
                  <a href="https://www.hempel.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border text-sm font-bold tracking-widest uppercase transition-all px-6 py-3 rounded-md hover:opacity-80" style={{ borderColor: 'rgba(26,50,114,0.3)', color: '#1A3272' }}>
                    Hempel Global <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,174,239,0.12)] border" style={{ borderColor: 'rgba(0,174,239,0.1)' }}>
                  <Image src="/hempel-distributor.jpg" alt="Official Hempel Authorized Distributor" width={200} height={150} className="object-contain" />
                  <p className="font-sans text-center text-xs font-semibold mt-4" style={{ color: '#8899AE' }}>Authorised Distributor · Trusted Since 1915</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #07111F, #0D1B45)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">WHY CHOOSE US</p>
                <h2 className="font-sans font-black text-white mt-2 sm:mt-3" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
                  The Clin Corp <span className="text-blue">Promise.</span>
                </h2>
                <p className="font-sans text-slate text-sm sm:text-base mt-4 leading-relaxed max-w-lg">
                  Quality products. Technical expertise. Reliable delivery. Lasting protection. <span style={{ color: '#F5A623' }}>That is the Clin Corp promise.</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {whyUs.map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,174,239,0.15)' }}>
                        <CheckCircle2 size={16} className="text-blue" />
                      </div>
                      <span className="font-sans font-semibold text-white text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Values */}
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px] mb-6">OUR VALUES</p>
                <div className="space-y-4">
                  {values.map((v) => (
                    <div key={v.title} className="rounded-xl p-5 border border-white/10 hover:border-blue/30 transition-all" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-start gap-4">
                        <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: v.color }} />
                        <div>
                          <h3 className="font-sans font-black text-white text-sm sm:text-base">{v.title}</h3>
                          <p className="font-sans text-slate text-sm leading-relaxed mt-1">{v.body}</p>
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
        <section className="bg-offwhite py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none" style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623, #00D4B4)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px] text-center" style={{ color: '#8899AE' }}>TRUSTED BY</p>
            <h2 className="font-sans font-black text-center mt-2" style={{ fontSize: 'clamp(24px, 4vw, 46px)', color: '#1A3272' }}>
              Our Valued Customers <span style={{ color: '#00AEEF' }}>&amp; Partners.</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10 sm:mt-14">
              {partners.map((p) => (
                <div key={p.name} className="rounded-2xl p-6 sm:p-8 border text-center hover:shadow-md transition-all" style={{ background: 'white', borderColor: 'rgba(0,174,239,0.12)' }}>
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #00AEEF, #1A3272)' }}>
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <h3 className="font-sans font-black text-sm sm:text-base leading-tight" style={{ color: '#1A3272' }}>{p.name}</h3>
                  <p className="font-sans text-xs mt-1" style={{ color: '#8899AE' }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <Team />

        {/* ── Contact strip ── */}
        <section className="bg-offwhite py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none" style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: MapPin, label: 'Address', value: 'Britam Towers, Hospital Road, Upper Hill, Nairobi, Kenya' },
                { icon: ShieldCheck, label: 'Phone', value: '+254 723 887 417' },
                { icon: ShieldCheck, label: 'Email', value: 'clin@clincorps.com' },
                { icon: ShieldCheck, label: 'Website', value: 'www.Clincorp.com' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,174,239,0.1)' }}>
                    <item.icon size={16} style={{ color: '#00AEEF' }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#8899AE' }}>{item.label}</p>
                    <p className="font-sans font-semibold text-sm mt-0.5" style={{ color: '#1A3272' }}>{item.value}</p>
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
            <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(26px, 4vw, 46px)' }}>
              Ready to Work <span className="text-blue">With Us?</span>
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base leading-relaxed mt-4">
              Talk to our team about your coating requirements and get a tailored solution for your project.
            </p>
            <a href="/contact" className="mt-7 inline-flex items-center gap-2 text-white rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]" style={{ background: '#00AEEF' }}>
              GET IN TOUCH <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
