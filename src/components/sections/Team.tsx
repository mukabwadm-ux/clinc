import Image from 'next/image'
import type { TeamMember } from '@/types'

// Card palette taken from the supplied reference design.
const CARD_BG = '#F1F1F1'
const AVATAR_BG = '#E4E4E4'
const ACCENT = '#E08A1E'
const NAME_COLOR = '#141414'
const ROLE_COLOR = '#1A2B5E'
const BIO_COLOR = '#2E3A4E'

const team: TeamMember[] = [
  {
    initials: 'CL',
    name: 'Clinton',
    role: 'Founder & CEO',
    image: '/team/clinton.jpg',
    bio: 'Clinton Ochieng is a dynamic business leader with a DipM ACIM, MSc in Project Management, and AMPP-SSPC Level 2 Certified Protective Coating Inspector credentials. He leads our company, specializing in delivering innovative solutions in coatings, logistics, and business development. With a strong foundation in marketing (BBA), leadership (SBS Leadership Excellence), and facilitation (IFC/World Bank Group certified), we drive growth through strategic vision and execution.',
  },
  {
    initials: 'RO',
    name: 'Robbins',
    role: 'Social Media Manager',
    bio: "Robbins drives operational excellence across Clin Corps's distribution network, ensuring products reach clients on time and at the highest standard. His technical expertise in coatings applications and logistics management is the backbone behind every successful project delivery across East Africa.",
  },
]

/** Vertical orange tab that straddles a card edge, as in the reference. */
function AccentBar({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      aria-hidden
      className="hidden sm:block absolute top-1/2 w-3 lg:w-3.5 h-20 lg:h-24"
      style={{
        background: ACCENT,
        left: side === 'left' ? 0 : undefined,
        right: side === 'right' ? 0 : undefined,
        transform: `translateY(-50%) translateX(${side === 'left' ? '-50%' : '50%'})`,
      }}
    />
  )
}

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-12 sm:py-16 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B45] via-[#1A3272] to-[#0B1F4B]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,174,239,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">THE PEOPLE</p>
        <h2 className="font-sans font-black text-white mt-2 sm:mt-3" style={{ fontSize: 'clamp(26px, 4.5vw, 48px)' }}>
          The Clin Corps <span className="text-blue">Team.</span>
        </h2>
        <p className="font-sans text-slate text-sm sm:text-base mt-3 sm:mt-4">
          Experienced leaders driving East Africa&apos;s coatings industry forward.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mt-10 sm:mt-12 lg:mt-16">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="relative flex flex-col items-center text-center px-6 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14"
              style={{ background: CARD_BG }}
            >
              <AccentBar side="left" />
              {i === team.length - 1 && <AccentBar side="right" />}

              <div
                className="relative rounded-full overflow-hidden flex items-center justify-center shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44"
                style={{ background: AVATAR_BG }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 176px, (min-width: 640px) 160px, 128px"
                    className="object-cover"
                  />
                ) : (
                  <span
                    className="font-sans font-black"
                    style={{ color: ROLE_COLOR, fontSize: 'clamp(30px, 5vw, 44px)' }}
                  >
                    {member.initials}
                  </span>
                )}
              </div>

              <h3
                className="font-sans font-black mt-6 sm:mt-7"
                style={{ color: NAME_COLOR, fontSize: 'clamp(19px, 2vw, 23px)' }}
              >
                {member.name}
              </h3>

              <p
                className="font-sans uppercase mt-2 text-[11px] sm:text-[13px] tracking-[0.18em] sm:tracking-[0.2em]"
                style={{ color: ROLE_COLOR }}
              >
                {member.role}
              </p>

              <p
                className="font-sans text-sm sm:text-[15px] leading-relaxed mt-5 sm:mt-6 max-w-md"
                style={{ color: BIO_COLOR }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
