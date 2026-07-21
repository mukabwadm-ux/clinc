'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MailOpen, Mail, Trash2 } from 'lucide-react'

export default function ContactActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggleRead() {
    setLoading(true)
    await fetch(`/api/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: !isRead }),
    })
    router.refresh()
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('Delete this message? This cannot be undone.')) return
    setLoading(true)
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={toggleRead}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-40"
        style={{ color: '#6B7A99' }}
      >
        {isRead ? <Mail size={13} /> : <MailOpen size={13} />}
        {isRead ? 'Mark unread' : 'Mark read'}
      </button>
      <span style={{ color: '#CBD5E1' }}>·</span>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-40"
        style={{ color: '#EF4444' }}
      >
        <Trash2 size={13} /> Delete
      </button>
    </div>
  )
}
