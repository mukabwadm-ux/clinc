'use client'

import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'Add Product',
  '/admin/quotes': 'Quotes',
  '/admin/media': 'Media',
  '/admin/contacts': 'Contacts',
}

function getTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname]
  if (pathname.includes('/products/') && pathname.endsWith('/edit')) return 'Edit Product'
  return 'Admin'
}

export default function AdminHeader() {
  const pathname = usePathname()
  const title = getTitle(pathname)

  return (
    <header
      className="h-14 flex items-center justify-between px-6 shrink-0"
      style={{ background: '#ffffff', borderBottom: '1px solid #E8ECF0' }}
    >
      <h1 className="font-black text-base" style={{ color: '#1A2B5E' }}>{title}</h1>

      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
          style={{ color: '#94A3B8' }}
          aria-label="Notifications"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F1F5F9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <Bell size={16} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs"
            style={{ background: 'linear-gradient(135deg, #0070C0, #1A3272)', color: '#ffffff' }}
            aria-hidden="true"
          >
            A
          </div>
          <span className="text-xs font-semibold hidden sm:block" style={{ color: '#475569' }}>Admin</span>
        </div>
      </div>
    </header>
  )
}
