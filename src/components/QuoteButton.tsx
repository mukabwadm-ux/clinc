'use client'

import { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  productName: string
  variant?: 'gold' | 'ghost' | 'link'
  fullWidth?: boolean
  label?: string
}

export default function QuoteButton({ productName, variant = 'ghost', fullWidth = false, label }: Props) {
  const [open, setOpen] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const btnLabel = label ?? (variant === 'gold' ? 'GET A QUOTE' : 'Get a Quote')

  const btnClass = variant === 'gold'
    ? `inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-black tracking-widest uppercase cursor-pointer transition-all duration-200 hover:brightness-110 ${fullWidth ? 'w-full' : 'px-8'}`
    : variant === 'ghost'
    ? 'inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer hover:gap-2.5'
    : 'inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3 transition-all duration-200'

  const btnStyle = variant === 'gold'
    ? { background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 24px rgba(245,166,35,0.28)' }
    : variant === 'ghost'
    ? { color: '#6B7A99' }
    : { color: '#0070C0' }

  return (
    <>
      <button type="button" className={btnClass} style={btnStyle} onClick={() => setOpen(true)}>
        {btnLabel} <ArrowRight size={variant === 'gold' ? 15 : 13} />
      </button>

      {open && <QuoteModal productName={productName} onClose={() => setOpen(false)} />}
    </>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function QuoteModal({ productName, onClose }: { productName: string; onClose: () => void }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', company: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { firstInputRef.current?.focus() }, [])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function validate() {
    const e: Record<string, string> = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = 'Full name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.company.trim()) e.company = 'Company name is required'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please describe your requirements (min 10 chars)'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, fullName: form.fullName, email: form.email, phone: form.phone, company: form.company, message: form.message }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,13,26,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0B1628', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Top gold bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #F5A623, rgba(245,166,35,0.2))' }} />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all z-10"
          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
          aria-label="Close"
        >
          <X size={15} />
        </button>

        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#10B981' }} />
              <h2 className="font-black text-xl text-white mb-2">Quote Request Sent!</h2>
              <p className="text-sm" style={{ color: '#6B7A99' }}>
                We&apos;ll get back to you shortly with pricing for <span style={{ color: '#F5A623' }}>{productName}</span>.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', color: '#fff' }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[3px] mb-2" style={{ color: '#F5A623' }}>Request a Quote</p>
                <h2 className="font-black text-xl text-white leading-tight">{productName}</h2>
                <div className="w-10 h-0.5 mt-3 rounded-full" style={{ background: 'linear-gradient(90deg, #F5A623, #0070C0)' }} />
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.fullName}>
                    <input
                      ref={firstInputRef}
                      type="text"
                      value={form.fullName}
                      onChange={e => { setForm(f => ({ ...f, fullName: e.target.value })); setErrors(v => ({ ...v, fullName: '' })) }}
                      placeholder="Jane Mwangi"
                      className={inp(!!errors.fullName)}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(v => ({ ...v, email: '' })) }}
                      placeholder="jane@company.com"
                      className={inp(!!errors.email)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Company *" error={errors.company}>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => { setForm(f => ({ ...f, company: e.target.value })); setErrors(v => ({ ...v, company: '' })) }}
                      placeholder="Your company"
                      className={inp(!!errors.company)}
                    />
                  </Field>
                  <Field label="Phone" error={undefined}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+254 7xx xxx xxx"
                      className={inp(false)}
                    />
                  </Field>
                </div>

                {/* Product badge */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5A623' }} />
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Product: <span style={{ color: '#F5A623' }}>{productName}</span>
                  </p>
                </div>

                <Field label="Requirements *" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(v => ({ ...v, message: '' })) }}
                    placeholder="Describe your application, quantity needed, surface area, or any specific requirements…"
                    rows={4}
                    className={inp(!!errors.message) + ' resize-none'}
                  />
                </Field>

                {status === 'error' && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <AlertCircle size={14} /> Something went wrong — please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black tracking-widest uppercase cursor-pointer transition-all hover:brightness-110 disabled:opacity-60"
                  style={{ background: '#F5A623', color: '#0D1B4B', boxShadow: '0 0 20px rgba(245,166,35,0.25)' }}
                >
                  {status === 'loading'
                    ? <><span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> Sending…</>
                    : <>Send Quote Request <ArrowRight size={15} /></>
                  }
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function inp(hasError: boolean) {
  return `w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all border ${hasError ? 'border-red-500/50 ring-1 ring-red-500/30' : 'border-white/10 focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20'}`
    + ' bg-white/5 text-white placeholder:text-white/25'
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: '#FCA5A5' }}>{error}</p>}
    </div>
  )
}
