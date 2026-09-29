'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading2, Heading3, Heading4, Undo2, Redo2,
  Link2, Unlink, ImagePlus, Quote, Minus, Pilcrow, Upload, X,
} from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
  error?: string
  /** Internal pages offered as suggestions in the link box. */
  internalLinks: { label: string; href: string }[]
}

type Panel = null | 'link' | 'image'

export default function PostEditor({ value, onChange, error, internalLinks }: Props) {
  const [panel, setPanel] = useState<Panel>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Internal links must stay followable, so no default target/rel —
        // external links get them when inserted.
        link: { openOnClick: false, autolink: true, HTMLAttributes: { target: null, rel: null } },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'post-body min-h-[420px] px-5 sm:px-8 py-6 outline-none',
      },
    },
  })

  if (!editor) return <div className="min-h-[480px] rounded-xl bg-white" style={{ border: '1px solid rgba(26,43,94,0.15)' }} />

  const btn = (label: string, icon: React.ReactNode, active: boolean, action: () => void) => ({ label, icon, active, action })

  const tools = [
    [
      btn('Paragraph', <Pilcrow size={14} />, editor.isActive('paragraph'), () => editor.chain().focus().setParagraph().run()),
      btn('Heading 2', <Heading2 size={14} />, editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run()),
      btn('Heading 3', <Heading3 size={14} />, editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run()),
      btn('Heading 4', <Heading4 size={14} />, editor.isActive('heading', { level: 4 }), () => editor.chain().focus().toggleHeading({ level: 4 }).run()),
    ],
    [
      btn('Bold', <Bold size={14} />, editor.isActive('bold'), () => editor.chain().focus().toggleBold().run()),
      btn('Italic', <Italic size={14} />, editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run()),
      btn('Underline', <UnderlineIcon size={14} />, editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run()),
    ],
    [
      btn('Bullet list', <List size={14} />, editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run()),
      btn('Numbered list', <ListOrdered size={14} />, editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run()),
      btn('Quote', <Quote size={14} />, editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run()),
      btn('Divider', <Minus size={14} />, false, () => editor.chain().focus().setHorizontalRule().run()),
    ],
    [
      btn('Link', <Link2 size={14} />, editor.isActive('link') || panel === 'link', () => setPanel(p => (p === 'link' ? null : 'link'))),
      btn('Remove link', <Unlink size={14} />, false, () => editor.chain().focus().extendMarkRange('link').unsetLink().run()),
      btn('Image', <ImagePlus size={14} />, panel === 'image', () => setPanel(p => (p === 'image' ? null : 'image'))),
    ],
    [
      btn('Undo', <Undo2 size={14} />, false, () => editor.chain().focus().undo().run()),
      btn('Redo', <Redo2 size={14} />, false, () => editor.chain().focus().redo().run()),
    ],
  ]

  return (
    <div className="rounded-xl overflow-hidden bg-white" style={{ border: `1px solid ${error ? '#FCA5A5' : 'rgba(26,43,94,0.15)'}`, boxShadow: error ? '0 0 0 2px rgba(239,68,68,0.12)' : undefined }}>
      {/* Toolbar — sticks under the admin header while writing long posts */}
      <div className="sticky top-0 z-10" style={{ background: '#F8F9FB', borderBottom: '1px solid rgba(26,43,94,0.10)' }}>
        <div className="flex items-center gap-px px-2 py-1.5 flex-wrap">
          {tools.map((group, gi) => (
            <div key={gi} className={`flex items-center gap-px ${gi < tools.length - 1 ? 'pr-2 mr-2 border-r' : ''}`} style={{ borderColor: 'rgba(26,43,94,0.12)' }}>
              {group.map(t => (
                <button
                  key={t.label}
                  type="button"
                  title={t.label}
                  aria-label={t.label}
                  aria-pressed={t.active}
                  onClick={t.action}
                  className="w-8 h-8 flex items-center justify-center rounded-md transition-colors cursor-pointer hover:bg-slate-200/60"
                  style={{
                    background: t.active ? 'rgba(245,166,35,0.15)' : undefined,
                    color: t.active ? '#B45309' : '#6B7A99',
                  }}
                >
                  {t.icon}
                </button>
              ))}
            </div>
          ))}
        </div>
        {panel === 'link' && <LinkPanel editor={editor} internalLinks={internalLinks} onClose={() => setPanel(null)} />}
        {panel === 'image' && <ImagePanel editor={editor} onClose={() => setPanel(null)} />}
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

// ── Link panel ───────────────────────────────────────────────────────────────

function LinkPanel({ editor, internalLinks, onClose }: { editor: Editor; internalLinks: Props['internalLinks']; onClose: () => void }) {
  const [href, setHref] = useState<string>(() => editor.getAttributes('link').href ?? '')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  function apply() {
    const url = href.trim()
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      onClose()
      return
    }
    const isExternal = /^https?:\/\//i.test(url) && !/^https?:\/\/(www\.)?clincorps\.com/i.test(url)
    const attrs = isExternal
      ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
      : { href: url.replace(/^https?:\/\/(www\.)?clincorps\.com/i, '') || '/', target: null, rel: null }

    const chain = editor.chain().focus().extendMarkRange('link')
    if (editor.state.selection.empty && !editor.isActive('link')) {
      // Nothing selected — insert the URL (or page name) as the link text.
      const label = internalLinks.find(l => l.href === attrs.href)?.label ?? url
      chain.insertContent({ type: 'text', text: label, marks: [{ type: 'link', attrs }] }).run()
    } else {
      chain.setLink(attrs as { href: string; target?: string | null; rel?: string | null }).run()
    }
    onClose()
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-3" style={{ borderTop: '1px solid rgba(26,43,94,0.08)' }}>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={href}
          onChange={e => setHref(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); apply() } if (e.key === 'Escape') onClose() }}
          list="internal-link-options"
          placeholder="/products/hempadur-… or https://…"
          className="flex-1 min-w-0 rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-blue-200"
          style={{ borderColor: 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
        />
        <datalist id="internal-link-options">
          {internalLinks.map(l => <option key={l.href} value={l.href}>{l.label}</option>)}
        </datalist>
        <button type="button" onClick={apply} className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer" style={{ background: '#F5A623', color: '#0D1B4B' }}>
          Apply
        </button>
        <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 cursor-pointer" style={{ color: '#9CAABB' }}><X size={15} /></button>
      </div>
      <p className="text-[11px]" style={{ color: '#9CAABB' }}>
        Start typing <span className="font-mono">/</span> to pick a product, guide or post. Internal links help pages rank; external links open in a new tab.
      </p>
    </div>
  )
}

// ── Image panel ──────────────────────────────────────────────────────────────

function ImagePanel({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [alt, setAlt] = useState('')
  const [err, setErr] = useState('')
  const [uploading, setUploading] = useState(false)
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  async function upload() {
    if (!file) { setErr('Choose an image'); return }
    if (!alt.trim()) { setErr('Alt text is required — describe the image'); return }
    setUploading(true); setErr('')
    const fd = new FormData()
    fd.append('file', file); fd.append('alt', alt.trim()); fd.append('bucket', 'product-images')
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Upload failed'); return }
      editor.chain().focus().setImage({ src: data.url, alt: alt.trim(), title: alt.trim() }).run()
      onClose()
    } catch { setErr('Network error — try again') }
    finally { setUploading(false) }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 px-3 py-3" style={{ borderTop: '1px solid rgba(26,43,94,0.08)' }}>
      <label className="shrink-0 w-full sm:w-28 h-20 rounded-lg border border-dashed flex items-center justify-center cursor-pointer overflow-hidden" style={{ borderColor: 'rgba(26,43,94,0.2)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {preview ? <img src={preview} alt="" className="w-full h-full object-cover" /> : <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#6B7A99' }}><Upload size={12} /> Choose</span>}
        <input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={e => { setFile(e.target.files?.[0] ?? null); setErr('') }} />
      </label>
      <div className="flex-1 min-w-0 space-y-2">
        <input
          type="text"
          value={alt}
          onChange={e => { setAlt(e.target.value); setErr('') }}
          placeholder="Alt text * — e.g. Anti-fouling paint applied to a fishing vessel hull in Mombasa"
          className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-blue-200"
          style={{ borderColor: err ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
        />
        <div className="flex items-center gap-2">
          <button type="button" onClick={upload} disabled={uploading} className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg cursor-pointer disabled:opacity-50" style={{ background: '#F5A623', color: '#0D1B4B' }}>
            {uploading ? <><span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={11} /> Insert image</>}
          </button>
          <button type="button" onClick={onClose} className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer" style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}>Cancel</button>
          <span className="text-[11px]" style={{ color: err ? '#EF4444' : '#9CAABB' }}>{err || 'JPEG, PNG, WEBP · max 500 KB'}</span>
        </div>
      </div>
    </div>
  )
}
