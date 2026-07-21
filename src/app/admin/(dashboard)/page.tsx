import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Package, Mail, MailOpen, Clock } from 'lucide-react'

export default async function AdminDashboard() {
  const [productsRes, contactsRes] = await Promise.all([
    supabaseAdmin.from('products').select('id, is_active', { count: 'exact' }),
    supabaseAdmin.from('contact_submissions').select('id, full_name, email, company, created_at, is_read', { count: 'exact' }).order('created_at', { ascending: false }).limit(6),
  ])

  const totalProducts = productsRes.count ?? 0
  const activeProducts = (productsRes.data ?? []).filter(p => p.is_active).length
  const totalContacts = contactsRes.count ?? 0
  const unreadContacts = (contactsRes.data ?? []).filter(c => !c.is_read).length
  const recentContacts = contactsRes.data ?? []

  const stats = [
    { label: 'Total Products', value: totalProducts, sub: `${activeProducts} active`, icon: Package, color: '#0070C0', bg: 'rgba(0,112,192,0.10)' },
    { label: 'Contact Submissions', value: totalContacts, sub: 'All time', icon: Mail, color: '#F5A623', bg: 'rgba(245,166,35,0.10)' },
    { label: 'Unread Messages', value: unreadContacts, sub: 'Needs attention', icon: MailOpen, color: unreadContacts > 0 ? '#EF4444' : '#10B981', bg: unreadContacts > 0 ? 'rgba(239,68,68,0.10)' : 'rgba(16,185,129,0.10)' },
  ]

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <p className="text-sm" style={{ color: '#6B7A99' }}>Welcome back — here&apos;s what&apos;s happening on your site.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="font-sans font-black text-2xl leading-none" style={{ color: '#1A2B5E' }}>{value}</p>
              <p className="font-sans text-xs font-semibold mt-0.5" style={{ color: '#1A2B5E' }}>{label}</p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: '#6B7A99' }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a href="/admin/products/new" className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3 hover:shadow-md transition-shadow cursor-pointer group" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div>
            <p className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Add New Product</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: '#6B7A99' }}>Create a marine or industrial listing</p>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ background: '#F5A623' }}>
            <Package size={16} style={{ color: '#0D1B4B' }} />
          </div>
        </a>
        <a href="/admin/contacts" className="bg-white rounded-2xl p-5 flex items-center justify-between gap-3 hover:shadow-md transition-shadow cursor-pointer group" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div>
            <p className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>View All Messages</p>
            <p className="font-sans text-xs mt-0.5" style={{ color: '#6B7A99' }}>{unreadContacts > 0 ? `${unreadContacts} unread` : 'All caught up'}</p>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ background: 'rgba(0,112,192,0.12)' }}>
            <Mail size={16} style={{ color: '#0070C0' }} />
          </div>
        </a>
      </div>

      {/* Recent contacts */}
      {recentContacts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(26,43,94,0.07)' }}>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: '#F5A623' }} />
              <span className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>Recent Messages</span>
            </div>
            <a href="/admin/contacts" className="font-mono text-[10px] uppercase tracking-widest transition-colors" style={{ color: '#0070C0' }}>
              View all
            </a>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            {recentContacts.map((c) => (
              <div key={c.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.is_read ? 'transparent' : '#F5A623', border: c.is_read ? '1.5px solid #CBD5E1' : 'none' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm truncate" style={{ color: '#1A2B5E' }}>{c.full_name}</p>
                  <p className="font-sans text-xs truncate" style={{ color: '#6B7A99' }}>{c.company ? `${c.company} · ` : ''}{c.email}</p>
                </div>
                <p className="font-mono text-[10px] shrink-0" style={{ color: '#9CAABB' }}>
                  {new Date(c.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
