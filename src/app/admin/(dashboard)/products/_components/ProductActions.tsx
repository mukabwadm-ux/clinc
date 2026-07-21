'use client'

import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function ProductActions({ id }: { id: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setDeleting(true)
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="inline-flex items-center gap-1">
      <a
        href={`/admin/products/${id}/edit`}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer hover:bg-blue-50"
        title="Edit"
      >
        <Pencil size={14} style={{ color: '#0070C0' }} />
      </a>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer hover:bg-red-50 disabled:opacity-40"
        title="Delete"
      >
        <Trash2 size={14} style={{ color: '#EF4444' }} />
      </button>
    </div>
  )
}
