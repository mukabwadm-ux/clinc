'use client'

import { Package, Mail, MailOpen, Clock, FileText } from 'lucide-react'
import { useActivity } from './ActivityProvider'
import type { ActivityPayload } from '@/app/api/admin/activity/route'

export default function DashboardLive({ initial }: { initial: ActivityPayload }) {
  const { data, error } = useActivity()

  // Server-rendered numbers hold the page until the first poll lands, so the
  // cards never flash empty.
  const { stats, events } = data ?? initial
  const live = data !== null && !error

  const cards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      sub: `${stats.activeProducts} active`,
      icon: Package,
      color: '#0070C0',
      bg: 'rgba(0,112,192,0.10)',
    },
    {
      label: 'Contact Submissions',
      value: stats.totalContacts,
      sub: 'All time',
      icon: Mail,
      color: '#F5A623',
      bg: 'rgba(245,166,35,0.10)',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadContacts,
      sub: stats.unreadContacts > 0 ? 'Needs attention' : 'All read',
      icon: MailOpen,
      color: stats.unreadContacts > 0 ? '#EF4444' : '#10B981',
      bg: stats.unreadContacts > 0 ? 'rgba(239,68,68,0.10)' : 'rgba(16,185,129,0.10)',
    },
    {
      label: 'Quote Requests',
      value: stats.totalQuotes,
      sub: stats.newQuotes > 0 ? `${stats.newQuotes} awaiting reply` : 'All handled',
      icon: FileText,
      color: stats.newQuotes > 0 ? '#F5A623' : '#10B981',
      bg: stats.newQuotes > 0 ? 'rgba(245,166,35,0.10)' : 'rgba(16,185,129,0.10)',
    },
  ]

  const contactEvents = events.filter((e) => e.type === 'contact').slice(0, 6)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end -mb-2">
        <span className="font-mono text-[10px] flex items-center gap-1.5" style={{ color: '#9CAABB' }}>
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${live ? 'animate-pulse' : ''}`}
            style={{ background: error ? '#EF4444' : live ? '#10B981' : '#CBD5E1' }}
          />
          {error ? 'Reconnecting…' : live ? 'Live' : 'Syncing…'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm gap-3"
            style={{ border: '1px solid rgba(26,43,94,0.07)' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <p
                className="font-black leading-none tabular-nums transition-all duration-300"
                style={{ color: '#1A2B5E', fontSize: '2rem' }}
              >
                {value}
              </p>
              <p className="font-semibold text-sm mt-1" style={{ color: '#1A2B5E' }}>{label}</p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: '#9CAABB' }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {contactEvents.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(26,43,94,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: '#F5A623' }} />
              <span className="font-black text-sm" style={{ color: '#1A2B5E' }}>Recent Messages</span>
            </div>
            <a
              href="/admin/contacts"
              className="font-mono text-[10px] uppercase tracking-widest hover:underline"
              style={{ color: '#0070C0' }}
            >
              View all
            </a>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            {contactEvents.map((c) => (
              <div key={c.id} className="px-6 py-3.5 flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: c.pending ? '#F5A623' : 'transparent',
                    border: c.pending ? 'none' : '1.5px solid #CBD5E1',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: '#1A2B5E' }}>{c.detail}</p>
                </div>
                <p className="font-mono text-[10px] shrink-0" style={{ color: '#9CAABB' }}>
                  {new Date(c.at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
