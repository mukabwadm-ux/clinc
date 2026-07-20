'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Case Stories', href: '/case-stories' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#040D1A]/97 backdrop-blur-md py-2.5 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
            : 'bg-transparent py-4 lg:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="shrink-0">
            <Image
              src="/clincorp_logo.png"
              alt="Clin-Corp"
              height={40}
              width={130}
              className="object-contain bg-white rounded-lg px-2 py-1 w-[108px] sm:w-[128px] lg:w-[148px] h-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="inline-flex items-center font-sans bg-gold text-navy rounded-lg px-5 py-2.5 text-xs font-black tracking-widest uppercase hover:brightness-110 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(245,166,35,0.25)]"
            >
              GET A QUOTE
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white/90 p-1.5 cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#040D1A' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
            <Image src="/clincorp_logo.png" alt="Clin-Corp" height={36} width={120} className="object-contain bg-white rounded-lg px-2 py-1 h-auto" />
            <button
              className="text-white/80 p-1.5 cursor-pointer hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>
          <div className="flex flex-col flex-1 items-start justify-center gap-1 px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans font-black text-white/80 hover:text-gold transition-colors duration-200 py-3 cursor-pointer w-full"
                style={{ fontSize: 'clamp(26px, 7vw, 38px)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center font-sans bg-gold text-navy rounded-lg px-8 py-3.5 text-sm font-black tracking-widest uppercase cursor-pointer"
            >
              GET A QUOTE
            </a>
          </div>
        </div>
      )}
    </>
  )
}
