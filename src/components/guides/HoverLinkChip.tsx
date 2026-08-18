'use client'

import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

/** Darker than the site's --color-gold (#F5A623) — used on hover for max contrast against both light and dark chip backgrounds. */
const HOVER_GOLD = '#B8791A'

interface HoverLinkChipProps {
  href: string
  style: CSSProperties
  className: string
  children: ReactNode
}

export function HoverLinkChip({ href, style, className, children }: HoverLinkChipProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      className={`${className} cursor-pointer`}
      style={hovered ? { ...style, color: HOVER_GOLD, textDecoration: 'underline' } : style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  )
}
