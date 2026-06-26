import type { TeamMember } from '@/types'

const team: TeamMember[] = [
  {
    initials: 'CL',
    name: 'Clinton',
    role: 'Founder & CEO',
    bio: 'Clinton leads Clin-Corp with a rare combination of marketing strategy, business development, and deep industry relationships. With a BBA in Marketing and IFC/World Bank certification, he has built a 37% East African market share from the ground up in under two years — proving that focused execution beats all.',
    gradientFrom: '#00AEEF',
    gradientTo: '#1A3272',
  },
  {
    initials: 'RO',
    name: 'Robbins',
    role: 'Co-Founder & Operations Director',
    bio: "Robbins drives operational excellence across Clin-Corp's distribution network, ensuring products reach clients on time and at the highest standard. His technical expertise in coatings applications and logistics management is the backbone behind every successful project delivery across East Africa.",
    gradientFrom: '#1A3272',
    gradientTo: '#00D4B4',
  },
]

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden py-16 lg:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B45] via-[#1A3272] to-[#0B1F4B]" />
      {/* Subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,174,239,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-[11px] text-blue uppercase tracking-[3px]">THE PEOPLE</p>
        <h2 className="font-sans font-black text-4xl lg:text-5xl text-white mt-3">
          The Clin-Corp <span className="text-blue">Team.</span>
        </h2>
        <p className="font-sans text-slate text-base mt-4">
          Experienced leaders driving East Africa&apos;s coatings industry forward.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {team.map((member) => (
            <div
              key={member.name}
              className="group bg-white/[0.04] border border-blue/15 rounded-2xl p-12 hover:border-blue hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(0,174,239,0.12)] transition-all duration-300"
            >
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-white font-black text-4xl border-[3px] border-blue shadow-[0_0_0_6px_rgba(0,174,239,0.15),0_0_30px_rgba(0,174,239,0.2)]"
                style={{
                  background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
                }}
              >
                {member.initials}
              </div>
              <h3 className="font-sans font-black text-4xl text-white mt-6">{member.name}</h3>
              <p className="font-sans text-xs uppercase tracking-[3px] text-blue font-semibold mt-2">
                {member.role}
              </p>
              {/* Gold divider */}
              <div
                className="w-12 h-0.5 mt-3 rounded-full"
                style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
              />
              <p className="font-sans text-[15px] text-slate leading-relaxed mt-5">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
