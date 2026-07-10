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
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md transition-all duration-300',
          scrolled ? 'py-2 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'py-3 lg:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/">
            <Image
              src="/clincorp_logo.png"
              alt="Clin-Corp"
              height={40}
              width={130}
              className="object-contain bg-white rounded-md px-2 py-1 w-[110px] sm:w-[130px] lg:w-[150px] h-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-blue transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="bg-blue text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-steel transition-colors"
            >
              GET A QUOTE
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-dark/97 z-40 flex flex-col items-center justify-center gap-6 px-6">
          <button
            className="absolute top-5 right-5 text-white p-1"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans font-black text-white hover:text-blue transition-colors"
              style={{ fontSize: 'clamp(28px, 8vw, 40px)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-blue text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-steel transition-colors mt-4"
          >
            GET A QUOTE
          </a>
        </div>
      )}
    </>
  )
}
