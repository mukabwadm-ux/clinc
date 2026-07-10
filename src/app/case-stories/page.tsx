import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Case Stories',
  description: 'Real-world projects where Clin-Corp delivered Hempel coating solutions across industrial and marine sectors in East Africa.',
}

export default function CaseStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <div className="py-12 sm:py-16 lg:py-24">
            <p className="font-mono text-[10px] sm:text-[11px] text-blue uppercase tracking-[3px]">
              REAL PROJECTS · REAL RESULTS
            </p>
            <h1
              className="font-sans font-black text-white mt-2 sm:mt-3"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
            >
              Case <span className="text-blue">Stories.</span>
            </h1>
            <p className="font-sans text-slate text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
              From marine vessels to industrial infrastructure — how Clin-Corp has protected East Africa&apos;s most critical assets with Hempel coatings.
            </p>
            <div
              className="w-16 h-0.5 mt-6 rounded-full"
              style={{ background: 'linear-gradient(90deg, #F5A623, #00AEEF)' }}
            />
          </div>

          {/* Placeholder */}
          <div className="flex flex-col items-center justify-center py-20 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #F5A623, #00AEEF)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h2
              className="font-sans font-black text-white"
              style={{ fontSize: 'clamp(22px, 4vw, 36px)' }}
            >
              Stories Coming Soon
            </h2>
            <p className="font-sans text-slate text-sm sm:text-base mt-3 max-w-md">
              We&apos;re documenting our project deliveries across East Africa. Check back soon for detailed case stories.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center bg-blue text-white rounded-md px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-steel transition-colors shadow-[0_0_24px_rgba(0,174,239,0.35)]"
            >
              DISCUSS YOUR PROJECT
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
