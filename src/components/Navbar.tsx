'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavLink = { label: string; href: string; children?: { label: string; href: string }[] }

const navLinks: NavLink[] = [
  { label: 'Products', href: '/products' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
    ],
  },
  { label: 'Case Stories', href: '/case-stories' },
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
              alt="Clin Corps"
              height={40}
              width={130}
              className="object-contain bg-white rounded-lg px-2 py-1 w-[108px] sm:w-[128px] lg:w-[178px] h-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) =>
              link.children ? (
                // Opens on hover and on keyboard focus, so it is reachable by tab.
                <div key={link.href} className="relative group">
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 font-sans text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </a>

                  {/* Hover bridge keeps the menu open while crossing the gap */}
                  <div className="absolute left-0 top-full h-3 w-full" />

                  <div
                    className="absolute left-0 top-full mt-3 min-w-[196px] rounded-xl overflow-hidden py-1.5 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200"
                    style={{
                      background: 'rgba(4,13,26,0.97)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 font-sans text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              )
            )}
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
            <Image src="/clincorp_logo.png" alt="Clin Corps" height={36} width={120} className="object-contain bg-white rounded-lg px-2 py-1 h-auto" />
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
              <div key={link.href} className="w-full">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-sans font-black text-white/80 hover:text-gold transition-colors duration-200 py-3 cursor-pointer w-full"
                  style={{ fontSize: 'clamp(26px, 7vw, 38px)' }}
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="flex flex-col pl-4 pb-2 -mt-1" style={{ borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
                    {link.children
                      .filter((child) => child.href !== link.href)
                      .map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-sans font-semibold text-white/55 hover:text-gold transition-colors duration-200 py-2 cursor-pointer"
                          style={{ fontSize: 'clamp(16px, 4.2vw, 21px)' }}
                        >
                          {child.label}
                        </a>
                      ))}
                  </div>
                )}
              </div>
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
