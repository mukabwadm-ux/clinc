import Image from 'next/image'

const navCols = [
  ['About', 'Expertise', 'Team'],
  ['Contact', 'Get a Quote'],
]

const navLinks: Record<string, string> = {
  About: '#about',
  Expertise: '#expertise',
  Team: '#team',
  Contact: '#contact',
  'Get a Quote': '#contact',
}

export default function Footer() {
  return (
    <footer className="bg-[#060f1c] py-12 sm:py-16 lg:py-20 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-10 lg:gap-12">
          {/* Left */}
          <div className="max-w-xs">
            <Image
              src="/clincorp_logo.png"
              alt="Clin-Corp"
              width={140}
              height={44}
              className="object-contain bg-white rounded-md px-2 py-1 w-[120px] sm:w-[140px] h-auto"
            />
            <p className="text-slate text-sm mt-4 leading-relaxed">
              Authorized Distributor for Hempel Industrial and Marine Coatings in Kenya and across
              East Africa. Quality coatings, trusted service.
            </p>
            <p className="text-blue text-[11px] font-mono tracking-widest uppercase mt-3">
              Nairobi, Kenya · Est. 2024
            </p>
          </div>

          {/* Right: nav columns */}
          <div className="flex gap-8 sm:gap-12 lg:gap-16">
            {navCols.map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((label) => (
                  <li key={label}>
                    <a
                      href={navLinks[label]}
                      className="font-sans text-sm text-slate hover:text-blue transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <hr className="border-white/[0.06] my-8 sm:my-12" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-slate">
          <p>© {new Date().getFullYear()} Clin-Corp Limited. All rights reserved.</p>
          <p className="font-mono text-[11px]">Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  )
}
