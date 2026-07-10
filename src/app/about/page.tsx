import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Team from '@/components/sections/Team'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Clin-Corp — Kenya\'s authorized Hempel Industrial & Marine Coatings distributor. Our story, mission, values, and the team behind East Africa\'s fastest-growing coatings company.',
}

const milestones = [
  { year: '2024', title: 'Founded', detail: 'Clin-Corp established in Nairobi as an authorized Hempel distributor.' },
  { year: '2024', title: 'First Major Contract', detail: 'Delivered industrial coating solutions to key infrastructure projects across Kenya.' },
  { year: '2025', title: '37% Market Share', detail: 'Captured 37% of the East African industrial and marine coatings market.' },
  { year: '2025', title: 'Regional Expansion', detail: 'Extended distribution reach across East Africa beyond Kenya.' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality First',
    body: 'We never compromise on product quality. Every Hempel coating we supply meets international standards for durability, safety, and performance.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    body: 'From project consultation to delivery, we measure success by the outcomes our clients achieve — extended asset life, reduced maintenance costs, and lasting protection.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    body: 'We work alongside our clients as long-term partners, not just suppliers. Our technical team is always available for guidance, site visits, and after-service support.',
  },
  {
    icon: Award,
    title: 'Certified Expertise',
    body: 'Our leadership holds internationally recognized qualifications — from BBA Marketing to IFC World Bank certifications — bringing structured expertise to every engagement.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-dark text-white">

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#0D1B45] to-[#040D1A]" />
          <div
            className="absolute -top-20 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,174,239,0.14) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 pt-32 sm:pt-36">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">OUR STORY</p>
            <h1
              className="font-sans font-black text-white mt-2 sm:mt-3 leading-[0.92]"
              style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
            >
              Built to <span className="text-blue">Protect.</span><br />
              Built to <span className="text-gold" style={{ color: '#F5A623' }}>Last.</span>
            </h1>
            <p className="font-sans text-slate text-base sm:text-lg mt-5 max-w-2xl leading-relaxed">
              Clin-Corp was founded with a singular purpose — to bring world-class Hempel coating solutions to East Africa&apos;s industrial and marine sectors, backed by local expertise and genuine partnership.
            </p>
            <div
              className="w-16 h-0.5 mt-6 rounded-full"
              style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
            />
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section className="bg-offwhite py-16 sm:py-20 lg:py-28 relative overflow-hidden" style={{ color: '#07111F' }}>
          <div
            className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623, #00D4B4)' }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#8899AE' }}>WHO WE ARE</p>
                <h2
                  className="font-sans font-black leading-tight mt-2"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A3272' }}
                >
                  Kenya&apos;s Authorized<br />
                  <span style={{ color: '#00AEEF' }}>Hempel Distributor.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-5" style={{ color: '#8899AE' }}>
                  Clin-Corp is the authorized distributor for Hempel Industrial and Marine Coatings in Kenya, proudly serving clients across East Africa from our Nairobi base since 2024.
                </p>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#8899AE' }}>
                  In under two years, we have built a <strong style={{ color: '#1A3272' }}>37% regional market share</strong> — a testament to our focus on technical excellence, responsive service, and the unmatched quality of Hempel&apos;s product range. We serve clients in infrastructure, manufacturing, oil &amp; gas, and maritime sectors.
                </p>
                <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#8899AE' }}>
                  Our partnership with Hempel — one of the world&apos;s leading coating manufacturers — gives our clients direct access to globally proven formulations, technical data sheets, and application support, delivered with local knowledge and care.
                </p>
                <a
                  href="https://www.hempel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-sm mt-6 hover:gap-3 transition-all"
                  style={{ color: '#00AEEF' }}
                >
                  Visit Hempel Global <ArrowRight size={16} />
                </a>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: '37%', label: 'East Africa Market Share', color: '#F5A623' },
                  { value: '2+', label: 'Years Operating', color: '#00AEEF' },
                  { value: 'EA', label: 'Regional Coverage', color: '#00D4B4' },
                  { value: '100%', label: 'Hempel Authorized', color: '#1A3272' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5 sm:p-7 border"
                    style={{ background: 'white', borderColor: 'rgba(0,174,239,0.12)' }}
                  >
                    <span
                      className="font-sans font-black block leading-none"
                      style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-widest mt-2 block" style={{ color: '#8899AE' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #07111F, #0D1B45, #07111F)' }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">WHAT DRIVES US</p>
            <h2
              className="font-sans font-black text-white mt-2 sm:mt-3"
              style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
            >
              Our <span className="text-blue">Values.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-14">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group rounded-2xl p-6 sm:p-8 border border-blue/10 hover:border-blue/40 hover:bg-white/[0.04] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, rgba(0,174,239,0.2), rgba(26,50,114,0.3))' }}
                  >
                    <v.icon size={20} className="text-blue" />
                  </div>
                  <h3 className="font-sans font-black text-white text-lg sm:text-xl">{v.title}</h3>
                  <p className="font-sans text-sm sm:text-[15px] text-slate leading-relaxed mt-3">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Journey / Milestones ── */}
        <section className="bg-offwhite py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#8899AE' }}>OUR JOURNEY</p>
            <h2
              className="font-sans font-black leading-tight mt-2"
              style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', color: '#1A3272' }}
            >
              From Day One to <span style={{ color: '#00AEEF' }}>Today.</span>
            </h2>
            <div className="mt-10 sm:mt-14 relative">
              {/* Vertical line */}
              <div
                className="absolute left-4 sm:left-6 top-2 bottom-2 w-px hidden sm:block"
                style={{ background: 'linear-gradient(to bottom, #00AEEF, #F5A623)' }}
              />
              <div className="space-y-8 sm:space-y-10">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 sm:gap-10 items-start">
                    <div className="hidden sm:flex flex-col items-center shrink-0" style={{ width: '48px' }}>
                      <div
                        className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                        style={{ background: i % 2 === 0 ? '#00AEEF' : '#F5A623', boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(0,174,239,0.5)' : 'rgba(245,166,35,0.5)'}` }}
                      />
                    </div>
                    <div
                      className="flex-1 rounded-2xl p-5 sm:p-7 border"
                      style={{ background: 'white', borderColor: 'rgba(0,174,239,0.1)' }}
                    >
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-widest"
                        style={{ color: i % 2 === 0 ? '#00AEEF' : '#F5A623' }}
                      >
                        {m.year}
                      </span>
                      <h3 className="font-sans font-black text-lg sm:text-xl mt-1" style={{ color: '#1A3272' }}>{m.title}</h3>
                      <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#8899AE' }}>{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hempel Partnership ── */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #07111F, #0D1B45)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
              <div>
                <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">OUR PRINCIPAL</p>
                <h2
                  className="font-sans font-black text-white mt-2 sm:mt-3"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
                >
                  Powered by <span className="text-blue">Hempel.</span>
                </h2>
                <p className="font-sans text-slate text-sm sm:text-base leading-relaxed mt-4 max-w-2xl">
                  Hempel is a world-leading coating manufacturer with over 100 years of experience protecting assets across the marine, infrastructure, energy, and decorative sectors. As Kenya&apos;s authorized distributor, Clin-Corp brings Hempel&apos;s entire product ecosystem — from anti-corrosion primers to advanced anti-fouling systems — directly to East Africa.
                </p>
                <p className="font-sans text-slate text-sm sm:text-base leading-relaxed mt-4 max-w-2xl">
                  Our authorization means every product we supply is genuine, certified, and backed by Hempel&apos;s global technical support network.
                </p>
                <div className="flex flex-wrap gap-4 mt-7">
                  <a
                    href="https://www.hempel.com/en/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue text-white rounded-md px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                  >
                    Hempel Products <ArrowRight size={14} />
                  </a>
                  <a
                    href="https://www.hempel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 text-white bg-white/5 hover:bg-white hover:text-navy rounded-md px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all"
                  >
                    Hempel Global <ArrowRight size={14} />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,174,239,0.15)]">
                  <Image
                    src="/hempel-distributor.jpg"
                    alt="Official Hempel Authorized Distributor"
                    width={180}
                    height={134}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <Team />

        {/* ── CTA ── */}
        <section className="bg-offwhite py-16 sm:py-20 lg:py-24 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #00AEEF, #F5A623)' }}
          />
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2
              className="font-sans font-black leading-tight"
              style={{ fontSize: 'clamp(26px, 4vw, 46px)', color: '#1A3272' }}
            >
              Ready to Work <span style={{ color: '#00AEEF' }}>With Us?</span>
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#8899AE' }}>
              Talk to our team about your coating requirements and get a tailored solution for your project.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 bg-blue text-white rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
            >
              GET IN TOUCH <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
