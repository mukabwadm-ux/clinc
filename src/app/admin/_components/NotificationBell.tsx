'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, Mail, FileText, Package, PencilLine, Loader2 } from 'lucide-react'
import { useActivity } from './ActivityProvider'
import type { ActivityEvent, ActivityType } from '@/app/api/admin/activity/route'

/** Timestamp of the last time the admin opened the panel. */
const SEEN_KEY = 'clincorp_admin_notifications_seen_at'

const ICONS: Record<ActivityType, typeof Mail> = {
  contact: Mail,
  quote: FileText,
  product_created: Package,
  product_updated: PencilLine,
}

const TONES: Record<ActivityType, { color: string; bg: string }> = {
  contact: { color: '#0070C0', bg: 'rgba(0,112,192,0.10)' },
  quote: { color: '#F5A623', bg: 'rgba(245,166,35,0.12)' },
  product_created: { color: '#10B981', bg: 'rgba(16,185,129,0.10)' },
  product_updated: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
}

function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })
}

export default function NotificationBell() {
  const { data, error } = useActivity()
  const [open, setOpen] = useState(false)
  const [seenAt, setSeenAt] = useState<number>(0)
  const panelRef = useRef<HTMLDivElement>(null)

  // Read the marker after mount so server and client render the same markup.
  useEffect(() => {
    const stored = window.localStorage.getItem(SEEN_KEY)
    setSeenAt(stored ? Number(stored) : 0)
  }, [])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const events: ActivityEvent[] = useMemo(() => data?.events ?? [], [data])

  const unseen = useMemo(
    () => events.filter((e) => new Date(e.at).getTime() > seenAt).length,
    [events, seenAt]
  )

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next && events.length > 0) {
      const newest = new Date(events[0].at).getTime()
      window.localStorage.setItem(SEEN_KEY, String(newest))
      setSeenAt(newest)
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={toggle}
        className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
        style={{ color: open ? '#1A2B5E' : '#94A3B8', background: open ? '#F1F5F9' : 'transparent' }}
        aria-label={unseen > 0 ? `Notifications, ${unseen} new` : 'Notifications'}
        aria-expanded={open}
      >
        <Bell size={16} />
        {unseen > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-black"
            style={{ background: '#EF4444', color: 'white', fontSize: '9px', lineHeight: 1 }}
          >
            {unseen > 9 ? '9+' : unseen}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-[330px] sm:w-[380px] rounded-2xl overflow-hidden z-50 bg-white"
          style={{ border: '1px solid rgba(26,43,94,0.10)', boxShadow: '0 18px 50px rgba(13,27,75,0.18)' }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(26,43,94,0.08)' }}
          >
            <span className="font-black text-sm" style={{ color: '#1A2B5E' }}>Activity</span>
            <span className="font-mono text-[10px] flex items-center gap-1.5" style={{ color: '#9CAABB' }}>
              {error ? (
                <span style={{ color: '#EF4444' }}>Offline</span>
              ) : data ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#10B981' }} />
                  Live
                </>
              ) : (
                <Loader2 size={11} className="animate-spin" />
              )}
            </span>
          </div>

          <div className="max-h-[380px] overflow-y-auto">
            {!data ? (
              <p className="px-4 py-8 text-center text-xs" style={{ color: '#9CAABB' }}>Loading activity…</p>
            ) : events.length === 0 ? (
              <p className="px-4 py-8 text-center text-xs" style={{ color: '#9CAABB' }}>No activity yet.</p>
            ) : (
              events.map((e) => {
                const Icon = ICONS[e.type]
                const tone = TONES[e.type]
                return (
                  <a
                    key={e.id}
                    href={e.href}
                    className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 cursor-pointer"
                    style={{ borderBottom: '1px solid rgba(26,43,94,0.05)' }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: tone.bg }}
                    >
                      <Icon size={14} style={{ color: tone.color }} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="font-bold text-xs truncate" style={{ color: '#1A2B5E' }}>{e.title}</span>
                        {e.pending && (
                          <span
                            className="shrink-0 px-1.5 rounded-full font-black"
                            style={{ background: 'rgba(239,68,68,0.10)', color: '#EF4444', fontSize: '8px', lineHeight: '14px' }}
                          >
                            NEW
                          </span>
                        )}
                      </span>
                      <span className="block text-xs truncate mt-0.5" style={{ color: '#6B7A99' }}>{e.detail}</span>
                    </span>
                    <span className="font-mono text-[10px] shrink-0 mt-1" style={{ color: '#9CAABB' }}>
                      {timeAgo(e.at)}
                    </span>
                  </a>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
