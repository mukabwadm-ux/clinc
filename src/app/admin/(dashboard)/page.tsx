import { Package, Mail, ArrowRight } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import DashboardLive from '../_components/DashboardLive'
import type { ActivityPayload } from '@/app/api/admin/activity/route'

// Counts must reflect the database on every load, never a cached render.
export const dynamic = 'force-dynamic'

/** First paint only — ActivityProvider takes over polling once mounted. */
async function getInitialSnapshot(): Promise<ActivityPayload> {
  const [products, active, contacts, unread, quotes, newQuotes, recent] = await Promise.all([
    supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
    supabaseAdmin.from('quotes').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin
      .from('contact_submissions')
      .select('id, full_name, company, is_read, created_at')
      .order('created_at', { ascending: false })
      .limit(6),
  ])

  return {
    stats: {
      totalProducts: products.count ?? 0,
      activeProducts: active.count ?? 0,
      totalContacts: contacts.count ?? 0,
      unreadContacts: unread.count ?? 0,
      totalQuotes: quotes.count ?? 0,
      newQuotes: newQuotes.count ?? 0,
    },
    events: (recent.data ?? []).map((c) => ({
      id: `contact-${c.id}`,
      type: 'contact' as const,
      title: 'New contact enquiry',
      detail: `${c.full_name}${c.company ? ` · ${c.company}` : ''}`,
      at: c.created_at,
      href: '/admin/contacts',
      pending: !c.is_read,
    })),
    generatedAt: new Date().toISOString(),
  }
}

export default async function AdminDashboard() {
  const initial = await getInitialSnapshot()
  const { unreadContacts } = initial.stats

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-white rounded-2xl px-7 py-5 flex items-center justify-between shadow-sm" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[3px] mb-1" style={{ color: '#F5A623' }}>Overview</p>
          <p className="font-black text-lg" style={{ color: '#1A2B5E' }}>Welcome back</p>
          <p className="text-sm mt-0.5" style={{ color: '#6B7A99' }}>Here&apos;s what&apos;s happening on your site today.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <a href="/admin/products/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:brightness-110 cursor-pointer" style={{ background: '#F5A623', color: '#0D1B4B' }}>
            <Package size={12} /> Add Product
          </a>
        </div>
      </div>

      {/* Live stats + recent messages */}
      <DashboardLive initial={initial} />

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <a
          href="/admin/products/new"
          className="bg-white rounded-2xl p-6 flex items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer group"
          style={{ border: '1px solid rgba(26,43,94,0.07)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F5A623' }}>
              <Package size={18} style={{ color: '#0D1B4B' }} />
            </div>
            <div>
              <p className="font-black text-sm" style={{ color: '#1A2B5E' }}>Add New Product</p>
              <p className="text-xs mt-0.5" style={{ color: '#6B7A99' }}>Create a marine or industrial listing</p>
            </div>
          </div>
          <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#CBD5E1' }} />
        </a>

        <a
          href="/admin/contacts"
          className="bg-white rounded-2xl p-6 flex items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer group"
          style={{ border: '1px solid rgba(26,43,94,0.07)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,112,192,0.10)' }}>
              <Mail size={18} style={{ color: '#0070C0' }} />
            </div>
            <div>
              <p className="font-black text-sm" style={{ color: '#1A2B5E' }}>View All Messages</p>
              <p className="text-xs mt-0.5" style={{ color: '#6B7A99' }}>
                {unreadContacts > 0 ? `${unreadContacts} unread message${unreadContacts !== 1 ? 's' : ''}` : 'All caught up'}
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: '#CBD5E1' }} />
        </a>
      </div>
    </div>
  )
}
