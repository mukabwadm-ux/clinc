'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Upload, Trash2, X, ImageIcon, FileText, Check, Images, Files } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  path: string
  alt: string | null
  bucket: string
  file_size: number
  mime_type: string
  created_at: string
}

type Tab = 'product-images' | 'product-documents'

export default function MediaManager() {
  const [tab, setTab] = useState<Tab>('product-images')
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState(false)
  const [deleteErr, setDeleteErr] = useState('')
  const [uploadErr, setUploadErr] = useState('')

  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [altInputs, setAltInputs] = useState<Record<number, string>>({})
  const [altErrors, setAltErrors] = useState<Record<number, string>>({})
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const isImages = tab === 'product-images'

  const load = useCallback(async () => {
    setLoading(true)
    setSelected(new Set())
    const res = await fetch(`/api/admin/media?bucket=${tab}`)
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [tab])

  useEffect(() => { load() }, [load])

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function selectAll() {
    if (selected.size === items.length) setSelected(new Set())
    else setSelected(new Set(items.map(i => i.id)))
  }

  async function handleDelete(ids?: string[]) {
    const toDelete = (ids ?? [...selected]).map(id => items.find(i => i.id === id)).filter(Boolean) as MediaItem[]
    if (!toDelete.length) return
    setDeleting(true); setDeleteErr('')
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: toDelete.map(i => ({ id: i.id, path: i.path, bucket: i.bucket })) }),
    })
    if (!res.ok) { const d = await res.json(); setDeleteErr(d.error ?? 'Delete failed') }
    else await load()
    setDeleting(false)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setPendingFiles(files)
    setAltInputs({})
    setAltErrors({})
    setUploadErr('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removePending(idx: number) {
    setPendingFiles(prev => prev.filter((_, i) => i !== idx))
    setAltInputs(prev => { const n = { ...prev }; delete n[idx]; return n })
    setAltErrors(prev => { const n = { ...prev }; delete n[idx]; return n })
  }

  async function uploadAll() {
    if (!pendingFiles.length) return
    if (isImages) {
      const errs: Record<number, string> = {}
      pendingFiles.forEach((_, i) => { if (!altInputs[i]?.trim()) errs[i] = 'Alt text is required' })
      if (Object.keys(errs).length) { setAltErrors(errs); return }
    }
    setUploading(true); setUploadErr('')
    let failed = 0
    for (let i = 0; i < pendingFiles.length; i++) {
      const fd = new FormData()
      fd.append('file', pendingFiles[i])
      fd.append('bucket', tab)
      if (isImages) fd.append('alt', altInputs[i]?.trim() ?? '')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) failed++
    }
    if (failed) setUploadErr(`${failed} file(s) failed to upload.`)
    setPendingFiles([])
    setAltInputs({})
    await load()
    setUploading(false)
  }

  return (
    <div className="space-y-5">
      {/* Tab bar */}
      <div className="flex items-center gap-2">
        {([
          { key: 'product-images', label: 'Images', icon: Images },
          { key: 'product-documents', label: 'Documents', icon: Files },
        ] as { key: Tab; label: string; icon: React.FC<{ size?: number }> }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{
              background: tab === key ? '#F5A623' : 'white',
              color: tab === key ? '#0D1B4B' : '#6B7A99',
              border: '1px solid',
              borderColor: tab === key ? '#F5A623' : 'rgba(26,43,94,0.12)',
            }}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Upload panel */}
      <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>
              Upload {isImages ? 'Images' : 'Documents'}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#9CAABB' }}>
              {isImages ? 'JPEG, PNG, WEBP — max 500 KB each. Alt text required.' : 'PDF, DOC, DOCX — max 10 MB each.'}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={isImages ? '.jpg,.jpeg,.png,.webp' : '.pdf,.doc,.docx'}
            onChange={handleFileSelect}
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            style={{ background: '#F5A623', color: '#0D1B4B' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.06)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)' }}
          >
            <Upload size={14} /> Select Files
          </label>
        </div>

        {pendingFiles.length > 0 && (
          <div className="space-y-3">
            <div className="divide-y rounded-xl overflow-hidden" style={{ borderColor: 'rgba(26,43,94,0.06)', border: '1px solid rgba(26,43,94,0.08)' }}>
              {pendingFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white">
                  {isImages ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={URL.createObjectURL(file)} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,112,192,0.08)' }}>
                      <FileText size={20} style={{ color: '#0070C0' }} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#1A2B5E' }}>{file.name}</p>
                    <p className="text-xs" style={{ color: '#9CAABB' }}>{(file.size / 1024).toFixed(1)} KB</p>
                    {isImages && (
                      <div className="mt-1.5">
                        <input
                          type="text"
                          placeholder="Alt text *"
                          value={altInputs[i] ?? ''}
                          onChange={e => setAltInputs(prev => ({ ...prev, [i]: e.target.value }))}
                          className="w-full text-xs px-2.5 py-1.5 rounded-md border outline-none focus:ring-1 focus:ring-blue-200"
                          style={{ borderColor: altErrors[i] ? '#FCA5A5' : 'rgba(26,43,94,0.15)', color: '#1A2B5E' }}
                        />
                        {altErrors[i] && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{altErrors[i]}</p>}
                      </div>
                    )}
                  </div>
                  <button type="button" onClick={() => removePending(i)} className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0">
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            {uploadErr && <p className="text-sm" style={{ color: '#EF4444' }}>{uploadErr}</p>}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setPendingFiles([])} className="px-4 py-2 rounded-xl text-sm border cursor-pointer" style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}>
                Cancel
              </button>
              <button type="button" onClick={uploadAll} disabled={uploading}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-50"
                style={{ background: '#F5A623', color: '#0D1B4B' }}>
                {uploading ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" /> Uploading…</> : <><Upload size={13} /> Upload {pendingFiles.length} file{pendingFiles.length > 1 ? 's' : ''}</>}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Library */}
      <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-sm" style={{ color: '#1A2B5E' }}>
              {isImages ? 'Image Library' : 'Document Library'}
            </h2>
            {items.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(26,43,94,0.07)', color: '#6B7A99' }}>
                {items.length}
              </span>
            )}
          </div>
          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer"
                style={{ color: '#6B7A99', borderColor: '#E2E8F0' }}
              >
                {selected.size === items.length ? 'Deselect all' : 'Select all'}
              </button>
              {selected.size > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete()}
                  disabled={deleting}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-50"
                  style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <Trash2 size={12} /> Delete {selected.size}
                </button>
              )}
            </div>
          )}
        </div>

        {deleteErr && <p className="text-sm mb-3" style={{ color: '#EF4444' }}>{deleteErr}</p>}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-xl animate-pulse" style={{ background: '#F1F5F9', height: isImages ? 120 : 72 }} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-14" style={{ color: '#CBD5E1' }}>
            {isImages ? <ImageIcon size={40} /> : <FileText size={40} />}
            <p className="mt-3 text-sm font-semibold">No {isImages ? 'images' : 'documents'} yet</p>
          </div>
        ) : isImages ? (
          /* Image grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {items.map(item => {
              const sel = selected.has(item.id)
              return (
                <div
                  key={item.id}
                  className="relative group cursor-pointer rounded-xl overflow-hidden"
                  style={{ border: `2px solid ${sel ? '#F5A623' : 'transparent'}` }}
                  onClick={() => toggleSelect(item.id)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.alt ?? ''} className="w-full h-24 object-cover" />
                  <div className="p-1.5">
                    <p className="text-[10px] truncate font-medium" style={{ color: '#475569' }}>{item.alt || <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>no alt</span>}</p>
                    <p className="text-[9px]" style={{ color: '#9CAABB' }}>{(item.file_size / 1024).toFixed(0)} KB</p>
                  </div>
                  {/* Select indicator */}
                  <div className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${sel ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}
                    style={{ background: sel ? '#F5A623' : 'rgba(0,0,0,0.4)', borderColor: sel ? '#F5A623' : 'rgba(255,255,255,0.6)' }}>
                    {sel && <Check size={10} style={{ color: '#0D1B4B' }} />}
                  </div>
                  {/* Delete single */}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleDelete([item.id]) }}
                    disabled={deleting}
                    className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
                    style={{ background: 'rgba(220,38,38,0.85)' }}
                  >
                    <Trash2 size={10} style={{ color: '#fff' }} />
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          /* Document list */
          <div className="divide-y rounded-xl overflow-hidden" style={{ borderColor: 'rgba(26,43,94,0.06)', border: '1px solid rgba(26,43,94,0.08)' }}>
            {items.map(item => {
              const sel = selected.has(item.id)
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 cursor-pointer transition-colors"
                  style={{ background: sel ? 'rgba(245,166,35,0.05)' : 'white' }}
                  onClick={() => toggleSelect(item.id)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all`}
                    style={{ background: sel ? '#F5A623' : 'transparent', borderColor: sel ? '#F5A623' : '#CBD5E1' }}>
                    {sel && <Check size={10} style={{ color: '#0D1B4B' }} />}
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,112,192,0.08)' }}>
                    <FileText size={16} style={{ color: '#0070C0' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#1A2B5E' }}>{item.path.split('/').pop()}</p>
                    <p className="text-xs" style={{ color: '#9CAABB' }}>{(item.file_size / 1024).toFixed(0)} KB · {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 hover:underline"
                    style={{ color: '#0070C0' }}>
                    View
                  </a>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleDelete([item.id]) }}
                    disabled={deleting}
                    className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-50 shrink-0"
                    style={{ color: '#EF4444' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
