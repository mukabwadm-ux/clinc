import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  Factory,
  Globe2,
  GraduationCap,

  Mic,
  Presentation,
  Quote,
  Ship,
  Users,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { SITE_URL } from '@/lib/site'

const LINKEDIN_URL = 'https://www.linkedin.com/in/clinton-ochieng/'

export const metadata: Metadata = {
  title: 'Leadership — Meet Our Managing Director',
  description:
    'Clinton Ochieng, Managing Director of Clin Corp Limited — an accomplished business leader in industrial and marine protective coatings, infrastructure projects and strategic business development across East Africa.',
  alternates: { canonical: `${SITE_URL}/leadership` },
  openGraph: {
    title: 'Meet Our Managing Director — Clinton Ochieng | Clin Corps',
    description:
      'Leading Clin Corp Limited as the authorized distributor of Hempel Industrial and Marine Coatings in Kenya.',
    url: `${SITE_URL}/leadership`,
    images: [{ url: '/team/clinton-md.jpg', width: 1000, height: 1250, alt: 'Clinton Ochieng, Managing Director' }],
  },
}

const qualifications = [
  { title: 'MSc, Project Management', body: 'Postgraduate specialisation in planning, delivery and control of complex technical projects.' },
  { title: 'AMPP / SSPC Level 2', body: 'Certified Protective Coating Inspector — the industry standard for coating inspection and quality assurance.' },
  { title: 'DipM ACIM', body: 'Diploma in Marketing, Associate of the Chartered Institute of Marketing.' },
  { title: 'BBA, Marketing', body: 'Bachelor of Business Administration, providing the commercial foundation for the business.' },
  { title: 'SBS Leadership Excellence', body: 'Strathmore Business School leadership programme.' },
  { title: 'IFC / World Bank Group', body: 'Certified facilitator, International Finance Corporation.' },
]

const experience = [
  { icon: Ship, title: 'Marine Coatings', body: 'Hull restorations, antifouling systems and newbuild coating specification for vessels across the East African coast.' },
  { icon: Factory, title: 'Industrial & Oil and Gas', body: 'Protective coating systems for fuel storage, process plant and heavy industrial assets.' },
  { icon: Building2, title: 'Infrastructure Projects', body: 'Long-life corrosion protection for bridges, steelwork and public infrastructure.' },
  { icon: Globe2, title: 'Regional Development', body: 'Building distribution and technical support capacity across Kenya, Uganda, Tanzania and the wider region.' },
]

const achievements = [
  { icon: BadgeCheck, title: 'Authorized Hempel Distributor in Kenya', body: 'Secured and holds the authorized distributorship for Hempel Industrial and Marine Coatings in Kenya.' },
  { icon: Ship, title: 'Marine & Industrial Coating Expertise', body: 'Technical authority across antifouling, hull protection and heavy-duty industrial coating systems.' },
  { icon: Factory, title: 'Oil & Gas Project Experience', body: 'Delivery of protective coating systems on fuel storage and energy sector assets.' },
  { icon: Building2, title: 'Infrastructure Protective Coating', body: 'Specification and supply for infrastructure projects requiring long-term asset protection.' },
  { icon: Globe2, title: 'Regional Market Development', body: 'Expansion of Clin Corp’s reach and technical service capability across East Africa.' },
]

const engagements = [
  { icon: Factory, title: 'Factory Visits — Portugal & Spain', body: 'On-site visits to Hempel manufacturing facilities in Europe, connecting production standards directly to client specification.' },
  { icon: Users, title: 'Customer Technical Seminars', body: 'Leading technical sessions for clients on coating selection, surface preparation and application standards.' },
  { icon: Mic, title: 'Industry Conferences', body: 'Participation in marine, coatings and infrastructure industry forums across the region.' },
  { icon: Presentation, title: 'Project Presentations', body: 'Technical and commercial presentations to asset owners, shipyards and infrastructure contractors.' },
  { icon: Award, title: 'Professional Certifications', body: 'Ongoing certification in protective coating inspection and project management disciplines.' },
]

export default function LeadershipPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/leadership#clinton-ochieng`,
    name: 'Clinton Ochieng',
    jobTitle: 'Managing Director',
    image: `${SITE_URL}/team/clinton-md.jpg`,
    url: `${SITE_URL}/leadership`,
    sameAs: [LINKEDIN_URL],
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: [
      'Industrial protective coatings',
      'Marine coatings',
      'Hempel coating systems',
      'Infrastructure corrosion protection',
      'Oil and gas asset protection',
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────
          Split composition from the supplied reference: copy left, portrait
          panel right, feature columns beneath. Kept on the dark brand ground
          because the navbar sits transparent over the hero with white links. */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-14 sm:pb-16 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B45] via-[#1A3272] to-[#0B1F4B]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 75% 35%, rgba(0,174,239,0.12) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

            {/* Copy */}
            <div>
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#F5A623' }}>
                Leadership
              </p>
              <h1
                className="font-sans font-black text-white mt-3 leading-[1.03]"
                style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
              >
                Meet Our <span style={{ color: '#0070C0' }}>Managing Director.</span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-sans font-black text-white" style={{ fontSize: 'clamp(20px, 2.6vw, 27px)' }}>
                  Clinton Ochieng
                </span>
                <span className="w-px h-6 hidden sm:block" style={{ background: 'rgba(255,255,255,0.18)' }} />
                <span
                  className="font-sans uppercase tracking-[0.18em] text-[11px] sm:text-[13px]"
                  style={{ color: '#F5A623' }}
                >
                  Managing Director, Clin Corp Limited
                </span>
              </div>

              <p className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed mt-6 max-w-xl" style={{ color: '#FFFFFF' }}>
                Clin Corp Limited is led by Clinton Ochieng, an accomplished business leader with extensive
                experience in industrial and marine protective coatings, infrastructure projects, and strategic
                business development. Under his leadership, Clin Corp has become the authorized distributor of
                Hempel Industrial and Marine Coatings in Kenya while delivering world-class coating solutions
                across East Africa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-black tracking-widest uppercase transition-all duration-200 cursor-pointer hover:brightness-110"
                  style={{ background: '#0A66C2', color: 'white', boxShadow: '0 0 28px rgba(10,102,194,0.32)' }}
                >
                  <LinkedInIcon size={17} />
                  View LinkedIn Profile
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 sm:px-7 py-3.5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Portrait panel */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-sm lg:max-w-none">
              <div
                className="absolute -top-3 -right-3 w-24 h-24 rounded-tr-2xl pointer-events-none hidden sm:block"
                style={{ borderTop: '3px solid #F5A623', borderRight: '3px solid #F5A623' }}
              />
              <div
                className="absolute -bottom-3 -left-3 w-24 h-24 rounded-bl-2xl pointer-events-none hidden sm:block"
                style={{ borderBottom: '3px solid #0070C0', borderLeft: '3px solid #0070C0' }}
              />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]" style={{ background: '#E9E9E9' }}>
                <Image
                  src="/team/clinton-md.jpg"
                  alt="Clinton Ochieng, Managing Director of Clin Corp Limited"
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16 lg:mt-20 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            {[
              { icon: GraduationCap, label: 'Certified Expertise', body: 'AMPP/SSPC Level 2 Protective Coating Inspector with an MSc in Project Management.' },
              { icon: Ship, label: 'Marine & Industrial', body: 'Hands-on delivery across vessels, fuel storage, plant and public infrastructure.' },
              { icon: Globe2, label: 'Regional Reach', body: 'Building Hempel distribution and technical support capability across East Africa.' },
            ].map((f) => (
              <div key={f.label} className="text-center sm:text-left">
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)' }}
                >
                  <f.icon size={20} style={{ color: '#F5A623' }} />
                </span>
                <h3 className="font-sans font-bold text-white text-base">{f.label}</h3>
                <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#6B7A99' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Biography ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
            <div>
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#0070C0' }}>
                Biography
              </p>
              <h2 className="font-sans font-black mt-3" style={{ color: '#0D1B4B', fontSize: 'clamp(26px, 3.6vw, 42px)' }}>
                A career built on <span style={{ color: '#F5A623' }}>protection.</span>
              </h2>
              <div className="w-14 h-1 rounded-full mt-5" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />

              <div className="relative mt-8 sm:mt-10 w-full max-w-sm mx-auto lg:mx-0">
                <div
                  className="absolute -bottom-3 -right-3 w-24 h-24 rounded-br-2xl pointer-events-none hidden sm:block"
                  style={{ borderBottom: '3px solid #F5A623', borderRight: '3px solid #F5A623' }}
                />
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_18px_50px_rgba(13,27,75,0.16)]">
                  <Image
                    src="/team/clinton-bio.jpg"
                    alt="Clinton Ochieng, Managing Director of Clin Corp Limited"
                    fill
                    sizes="(min-width: 640px) 384px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="font-sans leading-relaxed space-y-5 text-[15px] sm:text-base" style={{ color: '#2E3A4E' }}>
              <p>
                Clinton Ochieng is the Managing Director of Clin Corp Limited, Kenya&apos;s authorized distributor
                for Hempel Industrial and Marine Coatings. He brings together a rare combination of commercial
                leadership and hands-on technical authority in protective coatings — a field where the cost of
                specifying the wrong system is measured in years of asset life.
              </p>
              <p>
                His work spans the full breadth of the sector: antifouling and hull protection for vessels along
                the East African coast, heavy-duty industrial systems for fuel storage and process plant, and
                long-life corrosion protection for bridges, steelwork and public infrastructure. As an
                AMPP/SSPC Level 2 Certified Protective Coating Inspector, he is qualified to assess and sign off
                the very standards he asks his clients to hold their assets to.
              </p>
              <p>
                Alongside that technical grounding sits a strong commercial foundation — an MSc in Project
                Management, a Diploma in Marketing from the Chartered Institute of Marketing, and leadership
                training through Strathmore Business School. Under his direction, Clin Corp has grown from a
                new entrant into the authorized Hempel distributorship for Kenya, serving clients across the
                wider East African region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Qualifications ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#0070C0' }}>
            Credentials
          </p>
          <h2 className="font-sans font-black mt-3" style={{ color: '#0D1B4B', fontSize: 'clamp(26px, 3.6vw, 42px)' }}>
            Professional <span style={{ color: '#F5A623' }}>qualifications.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
            {qualifications.map((q) => (
              <div
                key={q.title}
                className="p-6 sm:p-7 rounded-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(13,27,75,0.08)]"
                style={{ background: '#F5F6F8', border: '1px solid rgba(13,27,75,0.07)' }}
              >
                <CheckCircle2 size={20} style={{ color: '#F5A623' }} />
                <h3 className="font-sans font-black mt-4 text-base sm:text-[17px]" style={{ color: '#0D1B4B' }}>
                  {q.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#5A6880' }}>{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry experience ──────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28" style={{ background: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0 shadow-[0_20px_60px_rgba(13,27,75,0.18)]">
                <Image
                  src="/team/clinton-onsite.jpg"
                  alt="Clinton Ochieng on site aboard a vessel during a coating inspection"
                  fill
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -z-10 -bottom-4 -right-4 w-40 h-40 rounded-2xl hidden lg:block"
                style={{ background: 'rgba(245,166,35,0.15)' }}
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#0070C0' }}>
                Industry Experience
              </p>
              <h2 className="font-sans font-black mt-3" style={{ color: '#0D1B4B', fontSize: 'clamp(26px, 3.6vw, 42px)' }}>
                On site, not <span style={{ color: '#F5A623' }}>behind a desk.</span>
              </h2>
              <p className="font-sans text-[15px] sm:text-base leading-relaxed mt-5" style={{ color: '#2E3A4E' }}>
                Specification decisions are made at the asset, not in a catalogue. That principle runs through
                every project Clin Corp takes on.
              </p>

              <div className="mt-8 space-y-5">
                {experience.map((e) => (
                  <div key={e.title} className="flex gap-4">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg"
                      style={{ background: 'rgba(0,112,192,0.08)' }}
                    >
                      <e.icon size={19} style={{ color: '#0070C0' }} />
                    </span>
                    <div>
                      <h3 className="font-sans font-bold text-[15px] sm:text-base" style={{ color: '#0D1B4B' }}>{e.title}</h3>
                      <p className="font-sans text-sm leading-relaxed mt-1" style={{ color: '#5A6880' }}>{e.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievements ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B45] via-[#1A3272] to-[#0B1F4B]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px] text-blue">Track Record</p>
          <h2 className="font-sans font-black text-white mt-3" style={{ fontSize: 'clamp(26px, 3.6vw, 42px)' }}>
            Key <span className="text-blue">achievements.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="p-6 sm:p-7 rounded-xl transition-all duration-300 hover:border-blue hover:bg-white/[0.07]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,174,239,0.15)' }}
              >
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg mb-4"
                  style={{ background: 'rgba(245,166,35,0.12)' }}
                >
                  <a.icon size={19} style={{ color: '#F5A623' }} />
                </span>
                <h3 className="font-sans font-black text-white text-base sm:text-[17px]">{a.title}</h3>
                <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#8899AE' }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media & speaking ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px]" style={{ color: '#0070C0' }}>
            Media &amp; Speaking
          </p>
          <h2 className="font-sans font-black mt-3" style={{ color: '#0D1B4B', fontSize: 'clamp(26px, 3.6vw, 42px)' }}>
            Engagements &amp; <span style={{ color: '#F5A623' }}>appearances.</span>
          </h2>

          <div className="mt-10 sm:mt-14 divide-y" style={{ borderColor: 'rgba(13,27,75,0.08)' }}>
            {engagements.map((m, i) => (
              <div key={m.title} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 sm:py-7" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(13,27,75,0.08)' }}>
                <span className="font-mono text-xs tabular-nums shrink-0 w-8" style={{ color: '#F5A623' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg"
                  style={{ background: 'rgba(0,112,192,0.08)' }}
                >
                  <m.icon size={19} style={{ color: '#0070C0' }} />
                </span>
                <div className="sm:flex-1">
                  <h3 className="font-sans font-black text-base sm:text-[17px]" style={{ color: '#0D1B4B' }}>{m.title}</h3>
                  <p className="font-sans text-sm leading-relaxed mt-1.5 max-w-2xl" style={{ color: '#5A6880' }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ───────────────────────────────────────────────────────
          Pull-quote treatment from the supplied card designs.
          NOTE: this statement is a draft written for layout — it must be
          approved or replaced by Clinton before it stands as his words. */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-28" style={{ background: '#0D1B4B' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(0,174,239,0.10) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-7 sm:p-12 lg:p-16">
            {/* Corner frames echoing the reference card */}
            <div className="absolute top-0 left-0 w-20 sm:w-28 h-20 sm:h-28" style={{ borderTop: '3px solid #F5A623', borderLeft: '3px solid #F5A623' }} />
            <div className="absolute bottom-0 right-0 w-20 sm:w-28 h-20 sm:h-28" style={{ borderBottom: '3px solid #0070C0', borderRight: '3px solid #0070C0' }} />

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 lg:gap-14 items-center">
              <div>
                <Quote size={44} style={{ color: '#F5A623' }} className="mb-5" />
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[3px] mb-4" style={{ color: '#00D4B4' }}>
                  Vision for Clin Corp
                </p>
                <p
                  className="font-sans font-bold text-white leading-[1.35]"
                  style={{ fontSize: 'clamp(19px, 2.6vw, 31px)' }}
                >
                  Every asset we coat is someone&apos;s investment — a vessel, a bridge, a storage tank. My aim
                  for Clin Corp is that East Africa never has to choose between world-class protection and local
                  expertise. We bring both, and we stand behind the specification long after the last coat is
                  applied.
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-12 h-0.5 rounded-full" style={{ background: '#F5A623' }} />
                  <div>
                    <p className="font-sans font-black text-white text-base">Clinton Ochieng</p>
                    <p className="font-sans uppercase tracking-[0.16em] text-[10px] sm:text-[11px] mt-0.5" style={{ color: '#8899AE' }}>
                      Managing Director, Clin Corp Limited
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/team/clinton-intro.jpg"
                    alt="Clinton Ochieng"
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LinkedIn ─────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 lg:py-24" style={{ background: '#FAFAF8' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl p-7 sm:p-10 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(10,102,194,0.16)] cursor-pointer"
            style={{ background: '#FFFFFF', border: '1px solid rgba(13,27,75,0.10)' }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
              <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden" style={{ background: '#E9E9E9' }}>
                <Image src="/team/clinton-intro.jpg" alt="Clinton Ochieng" fill sizes="112px" className="object-cover" />
              </div>
              <div className="sm:flex-1">
                <span
                  className="inline-flex items-center gap-2 rounded-md px-2.5 py-1 mb-3"
                  style={{ background: 'rgba(10,102,194,0.10)' }}
                >
                  <LinkedInIcon size={14} className="text-[#0A66C2]" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-widest" style={{ color: '#0A66C2' }}>
                    LinkedIn
                  </span>
                </span>
                <h3 className="font-sans font-black text-lg sm:text-xl" style={{ color: '#0D1B4B' }}>
                  Verify his professional background
                </h3>
                <p className="font-sans text-sm leading-relaxed mt-2" style={{ color: '#5A6880' }}>
                  Clinton&apos;s LinkedIn profile sets out his qualifications, leadership role and company focus
                  in full. Connect with him directly at{' '}
                  <span className="font-semibold group-hover:underline" style={{ color: '#0A66C2' }}>
                    linkedin.com/in/clinton-ochieng
                  </span>
                  .
                </p>
              </div>
              <Compass size={22} className="hidden sm:block shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: '#0A66C2' }} />
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
