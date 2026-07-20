import type { Metadata } from 'next'
import { Anchor, Factory, Zap, ArrowRight, MapPin, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Case Stories',
  description: 'Real-world marine and industrial coating projects delivered by Clin-Corp across East Africa — hull restorations, infrastructure protection, and tank linings using Hempel systems.',
}

const marineProjects = [
  {
    number: '01',
    title: 'Ferry Hull Recoating & Inland Vessel Preparation',
    date: 'March 2025',
    location: 'Coastal & Inland Kenya',
    tag: 'Vessel Coating',
    description: 'Below-waterline and hull-area coating on a passenger/cargo ferry applying a full Hempel system directly at the vessel\'s berth, alongside surface preparation and priming of a red-hulled tug/barge vessel at an inland waterway site.',
    specs: [],
  },
  {
    number: '02',
    title: 'Hull Blasting & Epoxy Priming Programme',
    date: '28–30 April 2025',
    location: 'Shipyard',
    tag: 'SA 2.5 Blast + Hempadur Quattro 17634',
    description: 'A three-day surface-preparation and priming cycle: abrasive blasting to SA 2.5 near-white metal standard followed by Hempadur Quattro 17634 epoxy primer application, delivering a hull ready for full topcoat.',
    specs: [
      { label: 'Surface Prep', value: 'Abrasive blasting to SA 2.5 standard' },
      { label: 'Primer', value: 'Hempadur Quattro 17634 epoxy primer' },
      { label: 'Duration', value: '3-day documented sequence' },
    ],
  },
  {
    number: '03',
    title: 'Pre-Repair Hull Inspection Protocol',
    date: '25 July 2025',
    location: 'Mombasa Shipyard',
    tag: 'Inspection',
    description: 'Professional hull inspection ahead of every repair job to determine the correct antifouling specification — ensuring blasting grade, primer selection, and antifouling type are matched to each vessel\'s actual condition.',
    specs: [],
  },
  {
    number: '04',
    title: 'Kivu Spear 1 — Hull Restoration',
    date: 'July 2025',
    location: 'Mombasa Shipyard',
    tag: 'Full Hull Coating',
    description: 'Full hull restoration of MV Kivu Spear 1, documented from initial slipway positioning through active hot-work and repainting. The job covered the complete underwater hull area with the vessel supported on shipway trolleys.',
    specs: [],
  },
  {
    number: '05',
    title: 'Kilimanjaro Ferry — Full Hull Restoration',
    date: '28 July – 4 August 2025',
    location: 'Mombasa Shipyard',
    tag: 'Passenger Ferry',
    description: 'Complete repaint of the high-speed passenger ferry Kilimanjaro, beginning with a meticulous Hempel Paints inspection before full surface preparation and recoating of the hull and superstructure, finishing with the restored red hull and re-lettered livery.',
    specs: [],
  },
  {
    number: '06',
    title: 'Shipyard Vessel Hull Treatment',
    date: '7 August 2025',
    location: 'Mombasa Shipyard',
    tag: 'Corrosion Protection & Antifouling',
    description: 'Complete hull treatment using Hempel\'s corrosion protection and antifouling systems to restore operational performance and extend service life ahead of return to service.',
    specs: [],
  },
  {
    number: '07',
    title: 'MV Nyangumi — Full Hull Restoration',
    date: '26 February 2026',
    location: 'Mombasa Shipyard',
    tag: 'Tug / Workboat',
    description: 'Comprehensive hull restoration for tug MV Nyangumi: precision docking via vertical lift and shiplift transfer, abrasive blasting to SA 2.5, and a multi-stage Hempel coating system — delivering a smooth, hydrodynamic hull finish to reduce drag and maximise fuel efficiency.',
    specs: [
      { label: 'Partner Yard', value: 'Mombasa Shipyard' },
      { label: 'Blast Standard', value: 'SA 2.5 (near-white metal)' },
      { label: 'Coating System', value: 'High-build epoxy primer + premium antifouling topcoat' },
    ],
  },
  {
    number: '08',
    title: 'Ferry & Tug Boat New-Build Coating',
    date: '29 January 2026',
    location: 'Mombasa, Coast Kenya',
    tag: 'New-Build, Full System',
    description: 'Full surface preparation and end-to-end Hempel coating on a new-build ferry and tug boat — high-performance priming, intermediate, and topcoat layers above the waterline for weather resistance, and a specialised antifouling kit below for long-term hull efficiency.',
    specs: [],
  },
  {
    number: '09',
    title: 'Vessel Hull Grinding & Spray Finishing',
    date: '26 May 2026',
    location: 'Mombasa Shipyard',
    tag: 'Hull Grinding, Red Antifouling Spray',
    description: 'End-to-end hull-protection process — from hull grinding through to flawless spray application of Hempel\'s heavy-duty red marine antifouling — delivering a high-gloss finish that extends fleet life and keeps vessel performance at its peak.',
    specs: [],
  },
  {
    number: '10',
    title: 'Malkia — Mombasa Pilots Vessel Restoration',
    date: 'Mombasa Shipyard',
    location: 'Mombasa Shipyard',
    tag: 'Pilot Boat · Full Hull Restoration',
    description: 'Full hull restoration of pilot vessel Malkia, operated under the Mombasa Pilots service — from initial slipway lift and hull assessment through to the finished orange-and-black pilot livery ready for return to active harbour duty.',
    specs: [],
  },
  {
    number: '11',
    title: 'KRA 002 — Kenya Revenue Authority Patrol Vessel',
    date: 'Mombasa Shipyard',
    location: 'Mombasa',
    tag: 'Patrol / Enforcement Vessel',
    description: 'The Kenya Revenue Authority patrol vessel KRA 002 was lifted and positioned at the shipyard for scheduled hull maintenance work, supporting KRA\'s marine enforcement and customs patrol operations along the Kenyan coast.',
    specs: [],
  },
]

const industrialProjects = [
  {
    number: '12',
    title: 'KeNHA Bridge Project — Steel Protection',
    date: '17 January 2026',
    location: 'Kenya',
    tag: 'Hempaprime Multi 500',
    description: 'Supply and delivery of Hempaprime Multi 500 industrial primer for a major Kenya National Highway Authority (KeNHA) bridge project, protecting the steel superstructure of a national road infrastructure asset from corrosion.',
    specs: [
      { label: 'Client', value: 'Kenya National Highway Authority (KeNHA)' },
      { label: 'Product', value: 'Hempaprime Multi 500' },
      { label: 'Scope', value: 'Steel structure corrosion protection for a national bridge project' },
    ],
  },
  {
    number: '13',
    title: 'Total Energy Uganda — Storage Tank Coating',
    date: '10 September 2025',
    location: 'Uganda',
    tag: 'Fuel Storage Tank',
    description: 'Complete three-coat Hempel system on a fuel storage tank for Total Energy Uganda — demonstrating Clincorp\'s project reach into the wider East African region.',
    specs: [
      { label: 'Primer', value: 'Hempadur Avanguard 500 1734G' },
      { label: 'Intermediate', value: 'Hempadur Multi 500 45950' },
      { label: 'Topcoat', value: 'Hempathane Topcoat 55610 HG' },
    ],
  },
  {
    number: '14',
    title: 'Oil & Gas Storage Tank Lining',
    date: '20 February 2026',
    location: 'Nairobi, Kenya',
    tag: 'Hempadur 85671',
    description: 'Supply of Hempadur 85671 — an amine-adduct-cured phenolic epoxy internal tank lining — for refinery and industrial storage applications across Kenya\'s oil and gas sector, engineered to withstand sustained heat and aggressive chemical exposure.',
    specs: [
      { label: 'Product', value: 'Hempadur 85671' },
      { label: 'Application', value: 'Internal tank lining for oil, gas & fuel storage' },
    ],
  },
  {
    number: '15',
    title: 'Structural Steel Protection',
    date: 'Ongoing',
    location: 'Nairobi, Kenya',
    tag: 'Hempathane Topcoat 55210',
    description: 'Hempathane Topcoat 55210 — a glossy polyurethane topcoat cured with aliphatic isocyanate — delivering strong gloss and colour retention with resistance to severely corrosive atmospheric environments, curing at temperatures as low as -10°C.',
    specs: [
      { label: 'Product', value: 'Hempathane Topcoat 55210' },
      { label: 'Type', value: 'Glossy polyurethane topcoat' },
      { label: 'Feature', value: 'Cures at temperatures as low as -10°C' },
    ],
  },
]

export default function CaseStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark text-white">

        {/* ── Page Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#040D1A] via-[#0D1B45] to-[#040D1A]" />
          <div className="absolute -top-20 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,112,192,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-14 sm:pb-20">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">REAL PROJECTS · REAL RESULTS</p>
            <h1 className="font-sans font-black text-white mt-2 sm:mt-3 leading-[0.92]" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              Case <span className="text-blue">Stories.</span>
            </h1>
            <p className="font-sans text-slate text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
              From Mombasa Shipyard to Uganda's fuel terminals — how Clin-Corp has protected East Africa's most critical marine and industrial assets using Hempel coating systems.
            </p>
            <div className="w-16 h-0.5 mt-6 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

            {/* Summary stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '16', label: 'Documented Projects' },
                { value: '11', label: 'Marine Vessels' },
                { value: '4', label: 'Industrial Projects' },
                { value: '3', label: 'Countries' },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-sans font-black text-2xl sm:text-3xl block" style={{ color: '#F5A623' }}>{s.value}</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-slate">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 1: Marine ── */}
        <section className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #07111F, #0a1628)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,112,192,0.5), transparent)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,112,192,0.15)' }}>
                <Anchor size={20} className="text-blue" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-blue">SECTION 01</p>
                <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  Marine Vessel Projects
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {marineProjects.map((p) => (
                <div
                  key={p.number}
                  className="group rounded-2xl border border-white/10 hover:border-blue/40 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Top accent */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0070C0, #00D4B4)' }} />
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Number + tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono font-black text-2xl" style={{ color: 'rgba(0,112,192,0.25)' }}>{p.number}</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(0,112,192,0.12)', color: '#0070C0' }}>
                        {p.tag}
                      </span>
                    </div>

                    {/* Date + location */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate">
                        <Calendar size={11} />
                        <span>{p.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate">
                        <MapPin size={11} />
                        <span>{p.location}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-black text-white text-base sm:text-lg leading-snug">{p.title}</h3>

                    {/* Description */}
                    <p className="font-sans text-slate text-sm leading-relaxed mt-3 flex-1">{p.description}</p>

                    {/* Specs */}
                    {p.specs.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                        {p.specs.map((s) => (
                          <div key={s.label} className="flex gap-2 text-xs">
                            <span className="font-bold shrink-0" style={{ color: '#F5A623' }}>{s.label}:</span>
                            <span className="text-slate">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Industrial ── */}
        <section className="py-14 sm:py-20 lg:py-28 bg-offwhite relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.15)' }}>
                <Factory size={20} style={{ color: '#F5A623' }} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>SECTION 02</p>
                <h2 className="font-sans font-black" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', color: '#1A2B5E' }}>
                  Infrastructure &amp; Industrial Coatings
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {industrialProjects.map((p) => (
                <div
                  key={p.number}
                  className="group rounded-2xl border bg-white hover:shadow-[0_8px_40px_rgba(26,43,94,0.10)] transition-all duration-300 overflow-hidden flex flex-col"
                  style={{ borderColor: 'rgba(26,43,94,0.12)' }}
                >
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
                  <div className="p-5 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono font-black text-2xl" style={{ color: 'rgba(26,43,94,0.15)' }}>{p.number}</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(245,166,35,0.12)', color: '#B45309' }}>
                        {p.tag}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#8899AE' }}>
                        <Calendar size={11} />
                        <span>{p.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#8899AE' }}>
                        <MapPin size={11} />
                        <span>{p.location}</span>
                      </div>
                    </div>

                    <h3 className="font-sans font-black text-base sm:text-lg leading-snug" style={{ color: '#1A2B5E' }}>{p.title}</h3>
                    <p className="font-sans text-sm leading-relaxed mt-3 flex-1" style={{ color: '#6B7A99' }}>{p.description}</p>

                    {p.specs.length > 0 && (
                      <div className="mt-4 pt-4 border-t space-y-1.5" style={{ borderColor: 'rgba(26,43,94,0.08)' }}>
                        {p.specs.map((s) => (
                          <div key={s.label} className="flex gap-2 text-xs">
                            <span className="font-bold shrink-0" style={{ color: '#0070C0' }}>{s.label}:</span>
                            <span style={{ color: '#6B7A99' }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Technology ── */}
        <section className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #07111F, #0D1B45)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,112,192,0.4), transparent)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10 sm:mb-14">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,212,180,0.15)' }}>
                <Zap size={20} style={{ color: '#00D4B4' }} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: '#00D4B4' }}>SECTION 03</p>
                <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  Technology &amp; Performance
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00D4B4, #0070C0)' }} />
              <div className="p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono font-black text-2xl" style={{ color: 'rgba(0,212,180,0.25)' }}>16</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(0,212,180,0.12)', color: '#00D4B4' }}>
                      Fouling Release Silicone Antifouling
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-white" style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}>
                    Hempaguard X7 — Fouling Release &amp; Fuel Efficiency
                  </h3>
                  <p className="font-sans text-slate text-sm sm:text-[15px] leading-relaxed mt-4 max-w-2xl">
                    Clin-Corp promotes Hempaguard X7, Hempel&apos;s fusion fouling-release technology combining a hydrogel binder with biocide. In side-by-side comparison against a competitor premium silicone system after 180 days idle, Hempaguard X7 vessels showed a cleaner hull and smoother movement through the water.
                  </p>

                  {/* Performance stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    {[
                      { value: '6%', label: 'Average fuel savings' },
                      { value: '1.4%', label: 'Speed-loss reduction' },
                      { value: '90mo', label: 'Service intervals' },
                      { value: '120d', label: 'Max idle period' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl p-4 border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <span className="font-sans font-black text-xl sm:text-2xl block" style={{ color: '#00D4B4' }}>{stat.value}</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-slate mt-1 block">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Capability Summary ── */}
        <section className="bg-offwhite py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #0070C0, #F5A623, #00D4B4)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#8899AE' }}>OUR CAPABILITY</p>
            <h2 className="font-sans font-black mt-2" style={{ fontSize: 'clamp(24px, 4vw, 44px)', color: '#1A2B5E' }}>
              Full Scope. <span style={{ color: '#0070C0' }}>Proven Delivery.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10">
              {[
                { label: 'Marine', detail: 'Hull blasting, priming, antifouling & topcoat systems for ferries, tugs, patrol & pilot vessels' },
                { label: 'Infrastructure', detail: 'Structural steel priming & topcoats for bridges and industrial steelwork' },
                { label: 'Industrial', detail: 'Phenolic epoxy tank linings for oil, gas & fuel storage' },
                { label: 'Regional Reach', detail: 'Kenya (Nairobi, Mombasa) and Uganda, with capacity across East Africa' },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl p-5 sm:p-6 border" style={{ background: 'white', borderColor: 'rgba(0,112,192,0.1)' }}>
                  <h3 className="font-sans font-black text-base" style={{ color: '#1A2B5E' }}>{c.label}</h3>
                  <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#6B7A99' }}>{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #040D1A, #0D1B45, #040D1A)' }} />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="font-sans font-black text-white" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Have a project in <span className="text-blue">mind?</span>
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base mt-4 leading-relaxed">
              Talk to our team about your marine or industrial coating requirements — we deliver the right Hempel system for your asset.
            </p>
            <a href="/contact" className="mt-7 inline-flex items-center gap-2 text-white rounded-md px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors shadow-[0_0_24px_rgba(0,112,192,0.35)]" style={{ background: '#0070C0' }}>
              DISCUSS YOUR PROJECT <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
