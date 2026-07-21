'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { LayoutDashboard, Package, Images, Mail, LogOut } from 'lucide-react'

const nav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Media', href: '/admin/media', icon: Images },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside
      className="fixed top-0 left-0 h-full w-60 flex flex-col z-20"
      style={{ background: '#040D1A', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Brand */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="bg-white rounded-xl px-3 py-1.5 inline-flex items-center">
          <Image src="/clincorp_logo.png" alt="Clincorps" width={108} height={32} className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <p className="font-mono text-[9px] uppercase tracking-[2.5px]" style={{ color: 'rgba(245,166,35,0.65)' }}>Admin Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Admin navigation">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(href)

          return (
            <a
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group relative focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              style={{
                color: active ? '#F5A623' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(245,166,35,0.09)' : 'transparent',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: '#F5A623' }} />
              )}
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
            </a>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400/30"
          style={{ color: 'rgba(239,68,68,0.65)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.07)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.65)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          aria-label="Sign out of admin panel"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
