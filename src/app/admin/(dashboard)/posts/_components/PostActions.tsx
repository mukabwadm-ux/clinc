'use client'

import { useRouter } from 'next/navigation'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function PostActions({ id, liveSlug }: { id: string; liveSlug: string | null }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone, and its URL will stop working.')) return
    setDeleting(true)
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="inline-flex items-center gap-1">
      {liveSlug && (
        <a href={`/blog/${liveSlug}`} target="_blank" rel="noopener noreferrer" title="View live"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer hover:bg-slate-100">
          <ExternalLink size={14} style={{ color: '#6B7A99' }} />
        </a>
      )}
      <a href={`/admin/posts/${id}/edit`} title="Edit"
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer hover:bg-blue-50">
        <Pencil size={14} style={{ color: '#0070C0' }} />
      </a>
      <button onClick={handleDelete} disabled={deleting} title="Delete"
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer hover:bg-red-50 disabled:opacity-40">
        <Trash2 size={14} style={{ color: '#EF4444' }} />
      </button>
    </div>
  )
}
