'use client'

import { FileText, ShieldCheck, ClipboardList, Download } from 'lucide-react'

interface Props {
  pds: string | null
  sds: string | null
  ai: string | null
  dark?: boolean
}

export default function ProductDownloads({ pds, sds, ai, dark = false }: Props) {
  const docs = [
    { url: pds, label: 'Product Data Sheet',      icon: <FileText size={13} /> },
    { url: sds, label: 'Safety Data Sheet',        icon: <ShieldCheck size={13} /> },
    { url: ai,  label: 'Application Instructions', icon: <ClipboardList size={13} /> },
  ].filter(d => d.url)

  if (docs.length === 0) return null

  return (
    <div
      className="mt-4 rounded-xl p-3"
      style={dark
        ? { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
        : { background: 'rgba(0,112,192,0.03)', border: '1px solid rgba(26,43,94,0.07)' }
      }
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <Download size={10} style={{ color: dark ? 'rgba(245,166,35,0.7)' : '#9CAABB' }} />
        <p className="font-mono text-[9px] uppercase tracking-[2.5px]" style={{ color: dark ? 'rgba(245,166,35,0.7)' : '#9CAABB' }}>
          Product Downloads
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {docs.map(d => (
          <a
            key={d.label}
            href={d.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={dark
              ? { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.08)' }
              : { background: '#ffffff', color: '#1A2B5E', border: '1px solid rgba(26,43,94,0.10)' }
            }
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              if (dark) { el.style.background = 'rgba(245,166,35,0.10)'; el.style.color = '#F5A623'; el.style.borderColor = 'rgba(245,166,35,0.25)' }
              else { el.style.background = '#EFF6FF'; el.style.color = '#0070C0'; el.style.borderColor = 'rgba(0,112,192,0.2)' }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              if (dark) { el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = 'rgba(255,255,255,0.75)'; el.style.borderColor = 'rgba(255,255,255,0.08)' }
              else { el.style.background = '#ffffff'; el.style.color = '#1A2B5E'; el.style.borderColor = 'rgba(26,43,94,0.10)' }
            }}
            onClick={e => e.stopPropagation()}
          >
            <span className="flex items-center gap-2">{d.icon}<span>{d.label}</span></span>
            <Download size={11} className="opacity-50" />
          </a>
        ))}
      </div>
    </div>
  )
}
