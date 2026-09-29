'use client'

import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { DESCRIPTION_MAX, TITLE_MAX, formatDate, scoreColor, type SeoCheck } from '@/lib/blog/shared'

const STATUS_STYLE = {
  good: { icon: CheckCircle2, color: '#10B981' },
  warn: { icon: AlertTriangle, color: '#F59E0B' },
  bad: { icon: XCircle, color: '#EF4444' },
} as const


export function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  const color = scoreColor(score)
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`SEO score ${score} out of 100`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDF2F7" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
          style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-black text-sm" style={{ color }}>{score}</span>
    </div>
  )
}

/** Approximates how the post will look as a Google result. */
export function SerpPreview({ title, description, slug, date }: { title: string; description: string; slug: string; date: string | null }) {
  const shownTitle = title.length > TITLE_MAX + 5 ? `${title.slice(0, TITLE_MAX + 2).trim()}…` : title
  const shownDesc = description.length > DESCRIPTION_MAX ? `${description.slice(0, DESCRIPTION_MAX - 3).trim()}…` : description
  return (
    <div className="rounded-xl p-4" style={{ background: '#FFFFFF', border: '1px solid rgba(26,43,94,0.10)', fontFamily: 'Arial, sans-serif' }}>
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#F1F3F4' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="" className="w-4 h-4 object-contain" />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-[13px]" style={{ color: '#202124' }}>Clin Corp</p>
          <p className="text-[12px] truncate" style={{ color: '#4D5156' }}>clincorps.com › blog › {slug || 'your-post-url'}</p>
        </div>
      </div>
      <p className="text-[19px] leading-snug" style={{ color: '#1A0DAB' }}>{shownTitle || 'Your post title'}</p>
      <p className="text-[13px] leading-[1.55] mt-1" style={{ color: '#4D5156' }}>
        {date && <span style={{ color: '#70757A' }}>{formatDate(date)} — </span>}
        {shownDesc || 'Write a meta description to control what searchers see here.'}
      </p>
    </div>
  )
}

export function SeoChecklist({ checks }: { checks: SeoCheck[] }) {
  const order = { bad: 0, warn: 1, good: 2 }
  const sorted = [...checks].sort((a, b) => order[a.status] - order[b.status])
  return (
    <ul className="space-y-1">
      {sorted.map((c) => {
        const { icon: Icon, color } = STATUS_STYLE[c.status]
        return (
          <li key={c.id} className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-50">
            <Icon size={15} className="shrink-0 mt-0.5" style={{ color }} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-snug" style={{ color: '#1A2B5E' }}>{c.label}</p>
              {c.status !== 'good' && c.tip && <p className="text-[11px] leading-snug mt-0.5" style={{ color: '#6B7A99' }}>{c.tip}</p>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function CharCounter({ value, max, min }: { value: string; max: number; min: number }) {
  const n = value.length
  const color = n === 0 ? '#9CAABB' : n > max ? '#EF4444' : n < min ? '#F59E0B' : '#10B981'
  const pct = Math.min(100, (n / max) * 100)
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#EDF2F7' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="font-mono text-[10px] tabular-nums" style={{ color }}>{n}/{max}</span>
    </div>
  )
}
