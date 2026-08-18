import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Layers, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { SHIP_AREAS, TANKS, CARGO_HOLDS, BIOCIDE_TABLE, ANTIFOULING_LADDER } from '@/lib/guides/marine-paint-systems'

export const metadata: Metadata = {
  title: 'Marine Paint Systems Guide',
  description:
    "Recommended Hempel coating systems for every area of a vessel — topside to cargo holds — plus a look at Hempel's antifouling technology.",
}

export default function MarinePaintSystemsGuidePage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#040D1A' }} className="text-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 50%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mb-6 cursor-pointer transition-colors hover:text-white" style={{ color: '#8899AE' }}>
              <ArrowLeft size={13} /> All Guides
            </Link>
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-5"
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
              Guide · Marine
            </div>
            <h1 className="font-sans font-black leading-[0.95]" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}>
              Marine Paint Systems
            </h1>
            <p className="font-sans text-sm sm:text-base mt-4 max-w-2xl leading-relaxed" style={{ color: '#8899AE' }}>
              A vessel takes a different coating system in every zone. Here&apos;s Clin Corp&apos;s recommended Hempel
              system for each area — anticorrosive, tiecoat, and topcoat — plus what drives the choice between them.
            </p>
          </div>
        </section>

        {/* Ship areas */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0, #00D4B4)' }} />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Area by Area</p>
            </div>
            <h2 className="font-sans font-black leading-tight mb-10" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#1A2B5E' }}>
              Choosing a System for Each Zone
            </h2>

            <div className="space-y-6">
              {SHIP_AREAS.map((area) => (
                <div key={area.id} className="rounded-2xl border bg-white p-6 sm:p-7" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <Layers size={18} className="mt-0.5 shrink-0" style={{ color: '#F5A623' }} />
                    <div>
                      <h3 className="font-sans font-black text-lg" style={{ color: '#1A2B5E' }}>{area.title}</h3>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: '#6B7A99' }}>{area.priorities}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {area.systems.map((sys) => (
                      <div key={sys.label} className="rounded-xl p-4" style={{ background: '#FAFAF8', border: '1px solid rgba(26,43,94,0.08)' }}>
                        <p className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: '#0070C0' }}>{sys.label}</p>
                        <p className="text-sm font-bold mt-1.5" style={{ color: '#1A2B5E' }}>{sys.spec}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {sys.products.map((p) => (
                            <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(26,43,94,0.06)', color: '#1A2B5E' }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {area.followUp && (
                    <p className="text-sm mt-4 font-semibold" style={{ color: '#8899AE' }}>{area.followUp}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tanks */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Tanks &amp; Compartments</p>
            </div>
            <h2 className="font-sans font-black mb-10" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Tank Systems at a Glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TANKS.map((tank) => (
                <div key={tank.name} className="rounded-xl p-5 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="font-sans font-black text-sm">{tank.name}</p>
                  {tank.spec && <p className="text-xs mt-1" style={{ color: '#F5A623' }}>{tank.spec}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tank.products.map((p) => (
                      <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#8899AE' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cargo Holds */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>By Vessel Type</p>
            </div>
            <h2 className="font-sans font-black leading-tight mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#1A2B5E' }}>
              Cargo Hold Systems
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mb-10" style={{ color: '#6B7A99' }}>
              The right cargo hold system depends on what the vessel carries as much as the hull itself — chemical
              resistance, abrasion resistance, and low-temperature performance all point to different products.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CARGO_HOLDS.map((c) => (
                <div key={c.vesselType} className="rounded-xl p-5 border bg-white" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
                  <p className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>{c.vesselType}</p>
                  <p className="text-xs font-semibold mt-1" style={{ color: '#0070C0' }}>{c.driver}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.products.map((p) => (
                      <span key={p} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(26,43,94,0.06)', color: '#1A2B5E' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                  {c.note && <p className="text-xs mt-3" style={{ color: '#8899AE' }}>{c.note}</p>}
                </div>
              ))}
            </div>
            <p className="text-xs mt-6" style={{ color: '#8899AE' }}>
              Also account for drying time, curing time, and time to first cargo when specifying a cargo hold system.
            </p>
          </div>
        </section>

        {/* Antifouling deep dive */}
        <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 rounded-full" style={{ background: '#F5A623' }} />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>Deep Dive</p>
            </div>
            <h2 className="font-sans font-black mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Inside Antifouling Technology
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mb-10" style={{ color: '#8899AE' }}>
              Not every biocide fights the same kind of fouling equally well. A well-designed antifouling combines
              biocides to lower the concentration needed at the surface to stay clean.
            </p>

            {/* Biocide table */}
            <div className="overflow-x-auto rounded-xl border border-white/[0.08] mb-14">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th className="text-left font-mono text-[10px] uppercase tracking-wider px-4 py-3" style={{ color: '#8899AE' }}>Fouling Type</th>
                    <th className="text-left font-mono text-[10px] uppercase tracking-wider px-4 py-3" style={{ color: '#8899AE' }}>High Effect</th>
                    <th className="text-left font-mono text-[10px] uppercase tracking-wider px-4 py-3" style={{ color: '#8899AE' }}>Medium Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {BIOCIDE_TABLE.map((row, i) => (
                    <tr key={row.type} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                      <td className="px-4 py-3 font-bold" style={{ color: 'white' }}>{row.type}</td>
                      <td className="px-4 py-3" style={{ color: '#F5A623' }}>{row.high.join(', ')}</td>
                      <td className="px-4 py-3" style={{ color: '#8899AE' }}>{row.medium.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* NAT vs Rosin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
              <div className="rounded-xl p-6 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="font-sans font-black text-sm mb-2" style={{ color: '#00D4B4' }}>NAT — Nano Acrylate Technology</p>
                <p className="text-sm leading-relaxed" style={{ color: '#8899AE' }}>
                  Nanocapsules built from two acrylic polymers — a hydrophobic shell that controls water penetration,
                  and a hydrophilic core that hydrolyses on contact with seawater, releasing biocide in a controlled way.
                </p>
              </div>
              <div className="rounded-xl p-6 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="font-sans font-black text-sm mb-2" style={{ color: '#0070C0' }}>Rosin</p>
                <p className="text-sm leading-relaxed" style={{ color: '#8899AE' }}>
                  Seawater dissolves the rosin binder, releasing biocide as it leaches out. The leached layer is a
                  weakened, insoluble polymer; zinc carboxylate keeps that layer thin and controls the biocide release rate.
                </p>
              </div>
            </div>

            {/* Globic 9000 feature */}
            <div className="rounded-2xl p-6 sm:p-8 mb-14" style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.10), rgba(0,112,192,0.06))', border: '1px solid rgba(245,166,35,0.25)' }}>
              <div className="flex items-start gap-3 mb-4">
                <ShieldCheck size={20} style={{ color: '#F5A623' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: '#F5A623' }}>Featured Product</p>
                  <h3 className="font-sans font-black text-xl mt-1">Hempel&apos;s Globic 9000</h3>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm" style={{ color: '#D6DCE8' }}>
                <li>• One of Hempel&apos;s premium SPC antifoulings</li>
                <li>• Hydrolysing nano acrylate technology</li>
                <li>• Rated up to 90 months</li>
                <li>• Microfibre-reinforced coating</li>
                <li>• Flexible trading pattern</li>
                <li>• Fewer areas needing full blasting at drydock</li>
              </ul>
              <p className="text-xs mt-4" style={{ color: '#8899AE' }}>
                The microfibres reinforce the coating&apos;s mechanical strength, which reduces cracking and peeling —
                and in turn reduces drydocking costs over the coating&apos;s life.
              </p>
            </div>

            {/* Performance ladder */}
            <p className="font-mono text-[10px] uppercase tracking-[2px] mb-4" style={{ color: '#8899AE' }}>Antifouling Range, by Service Life</p>
            <div className="space-y-3">
              {ANTIFOULING_LADDER.map((tier) => (
                <div key={tier.months} className="rounded-xl p-4 sm:p-5 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#6B7A99' }}>{tier.months}</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.products.map((p) => (
                      <span
                        key={p.name}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={
                          p.featured
                            ? { background: '#F5A623', color: '#0D1B4B' }
                            : { background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }
                        }
                      >
                        {p.name}
                        <span style={{ opacity: 0.7, fontWeight: 500 }}>· {p.tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-24 text-center relative overflow-hidden" style={{ background: '#FAFAF8' }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="font-sans font-black" style={{ fontSize: 'clamp(24px, 4vw, 40px)', color: '#1A2B5E' }}>
              Ready to Spec Your <span style={{ color: '#F5A623' }}>System?</span>
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: '#6B7A99' }}>
              Talk to our team about your vessel, or run the numbers yourself with the Paint Calculator.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200" style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 28px rgba(245,166,35,0.25)' }}>
                GET IN TOUCH <ArrowRight size={16} />
              </Link>
              <Link href="/paint-calculator" className="inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-200 hover:opacity-80" style={{ border: '1px solid rgba(26,43,94,0.20)', color: '#1A2B5E' }}>
                Paint Calculator <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
