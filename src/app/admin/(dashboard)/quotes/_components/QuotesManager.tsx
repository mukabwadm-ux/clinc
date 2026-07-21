'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Package, ChevronDown, ChevronUp, Mail, Phone, Building2, Clock, CheckCheck, RefreshCw } from 'lucide-react'

interface Quote {
  id: string
  product_name: string
  full_name: string
  email: string
  phone: string | null
  company: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: string
}

interface Props {
  initialQuotes: Quote[]
}

const STATUS = {
  new: { label: 'New', bg: 'rgba(245,166,35,0.12)', color: '#D97706', dot: '#F5A623' },
  read: { label: 'Read', bg: 'rgba(0,112,192,0.10)', color: '#0070C0', dot: '#0070C0' },
  responded: { label: 'Responded', bg: 'rgba(16,185,129,0.10)', color: '#059669', dot: '#10B981' },
}

export default function QuotesManager({ initialQuotes }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [newIds, setNewIds] = useState<Set<string>>(new Set())
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'live' | 'error'>('connecting')

  const newCount = quotes.filter(q => q.status === 'new').length
  const totalCount = quotes.length

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('quotes-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quotes' },
        (payload) => {
          const incoming = payload.new as Quote
          setQuotes(prev => [incoming, ...prev])
          setNewIds(prev => new Set(prev).add(incoming.id))
          setExpanded(incoming.id)
          // Remove flash after 8s
          setTimeout(() => setNewIds(prev => { const n = new Set(prev); n.delete(incoming.id); return n }), 8000)
        }
      )
      .subscribe((status) => {
        setRealtimeStatus(status === 'SUBSCRIBED' ? 'live' : status === 'CHANNEL_ERROR' ? 'error' : 'connecting')
      })

    return () => { supabase.removeChannel(channel) }
  }, [])

  const refresh = useCallback(async () => {
    const res = await fetch('/api/admin/quotes')
    if (res.ok) setQuotes(await res.json())
  }, [])

  async function setStatus(id: string, status: Quote['status']) {
    setUpdating(id)
    const res = await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (res.ok) {
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q))
    }
    setUpdating(null)
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-sm" style={{ color: '#6B7A99' }}>
            {totalCount} total ·{' '}
            {newCount > 0
              ? <span style={{ color: '#F5A623' }}>{newCount} new</span>
              : <span style={{ color: '#10B981' }}>all handled</span>
            }
          </p>
          {/* Real-time indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: realtimeStatus === 'live' ? 'rgba(16,185,129,0.08)' : realtimeStatus === 'error' ? 'rgba(239,68,68,0.08)' : 'rgba(245,166,35,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{
              background: realtimeStatus === 'live' ? '#10B981' : realtimeStatus === 'error' ? '#EF4444' : '#F5A623',
              animation: realtimeStatus === 'live' ? 'pulse 2s infinite' : undefined,
            }} />
            <span className="font-mono text-[9px] uppercase tracking-[2px]" style={{ color: realtimeStatus === 'live' ? '#059669' : realtimeStatus === 'error' ? '#EF4444' : '#D97706' }}>
              {realtimeStatus === 'live' ? 'Live' : realtimeStatus === 'error' ? 'Offline' : 'Connecting'}
            </span>
          </div>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
          style={{ background: 'rgba(0,112,192,0.07)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.15)' }}
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Quote list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.09)', background: '#fff' }}>
        {quotes.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(245,166,35,0.08)' }}>
              <Package size={22} style={{ color: '#F5A623' }} />
            </div>
            <p className="font-sans text-sm font-semibold" style={{ color: '#1A2B5E' }}>No quote requests yet</p>
            <p className="font-sans text-xs mt-1" style={{ color: '#9CAABB' }}>They&apos;ll appear here the moment a visitor submits the form.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            {quotes.map(q => {
              const isNew = newIds.has(q.id)
              const isExpanded = expanded === q.id
              const st = STATUS[q.status]
              const date = new Date(q.created_at)

              return (
                <div
                  key={q.id}
                  className="transition-colors"
                  style={{
                    background: isNew ? 'rgba(245,166,35,0.04)' : q.status === 'new' ? 'rgba(245,166,35,0.02)' : '#fff',
                    outline: isNew ? '1px solid rgba(245,166,35,0.25)' : 'none',
                  }}
                >
                  {/* Row header */}
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : q.id)}
                    className="w-full text-left px-5 py-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status dot */}
                      <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: st.dot }} />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          {/* Product badge */}
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0" style={{ background: 'rgba(245,166,35,0.10)', color: '#D97706' }}>
                            <Package size={9} /> {q.product_name}
                          </span>
                          {isNew && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider animate-pulse" style={{ background: 'rgba(245,166,35,0.18)', color: '#F5A623' }}>
                              JUST IN
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 mt-1.5">
                          <span className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>{q.full_name}</span>
                          <span className="font-sans text-xs" style={{ color: '#6B7A99' }}>{q.company}</span>
                          <span className="font-sans text-xs" style={{ color: '#9CAABB' }}>{q.email}</span>
                          {q.phone && <span className="font-sans text-xs" style={{ color: '#9CAABB' }}>{q.phone}</span>}
                        </div>

                        {/* Preview line */}
                        {!isExpanded && (
                          <p className="font-sans text-xs mt-1.5 line-clamp-1" style={{ color: '#9CAABB' }}>{q.message}</p>
                        )}
                      </div>

                      {/* Right meta */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="font-mono text-[10px]" style={{ color: '#9CAABB' }}>
                          {date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                          {' '}
                          {date.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ background: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                        {isExpanded ? <ChevronUp size={13} style={{ color: '#9CAABB' }} /> : <ChevronDown size={13} style={{ color: '#9CAABB' }} />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="px-5 pb-5" style={{ borderTop: '1px solid rgba(26,43,94,0.06)' }}>
                      {/* Contact details strip */}
                      <div className="flex flex-wrap gap-4 py-3 mb-4">
                        <Detail icon={<Mail size={12} />} label={q.email} href={`mailto:${q.email}`} />
                        {q.phone && <Detail icon={<Phone size={12} />} label={q.phone} href={`tel:${q.phone}`} />}
                        <Detail icon={<Building2 size={12} />} label={q.company} />
                        <Detail icon={<Clock size={12} />} label={date.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })} />
                      </div>

                      {/* Message */}
                      <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(26,43,94,0.03)', border: '1px solid rgba(26,43,94,0.07)' }}>
                        <p className="font-mono text-[9px] uppercase tracking-[2px] mb-2" style={{ color: '#9CAABB' }}>Requirements</p>
                        <p className="font-sans text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#475569' }}>{q.message}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:${q.email}?subject=Re: Quote Request — ${q.product_name}&body=Hi ${q.full_name},%0D%0A%0D%0AThank you for your interest in ${q.product_name}. We%27d be happy to provide you with a quote.`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                          style={{ background: '#0070C0', color: '#fff' }}
                          onClick={() => q.status === 'new' && setStatus(q.id, 'read')}
                        >
                          <Mail size={12} /> Reply via Email
                        </a>

                        {q.status !== 'responded' && (
                          <button
                            type="button"
                            disabled={updating === q.id}
                            onClick={() => setStatus(q.id, 'responded')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
                            style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}
                          >
                            <CheckCheck size={12} /> Mark Responded
                          </button>
                        )}
                        {q.status === 'new' && (
                          <button
                            type="button"
                            disabled={updating === q.id}
                            onClick={() => setStatus(q.id, 'read')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
                            style={{ background: 'rgba(0,112,192,0.08)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.15)' }}
                          >
                            Mark Read
                          </button>
                        )}
                        {q.status === 'responded' && (
                          <button
                            type="button"
                            disabled={updating === q.id}
                            onClick={() => setStatus(q.id, 'new')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
                            style={{ background: 'rgba(245,166,35,0.08)', color: '#D97706', border: '1px solid rgba(245,166,35,0.2)' }}
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  )
}

function Detail({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = 'inline-flex items-center gap-1.5 text-xs font-medium'
  const style = { color: href ? '#0070C0' : '#6B7A99' }
  if (href) return <a href={href} className={cls} style={style}>{icon}{label}</a>
  return <span className={cls} style={style}>{icon}{label}</span>
}
