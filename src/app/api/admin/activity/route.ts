import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Always hit the database — this endpoint backs the live dashboard.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export type ActivityType = 'contact' | 'quote' | 'product_created' | 'product_updated'

export type ActivityEvent = {
  id: string
  type: ActivityType
  title: string
  detail: string
  at: string
  href: string
  /** Still needs the admin's attention (unread message, unactioned quote). */
  pending: boolean
}

export type ActivityStats = {
  totalProducts: number
  activeProducts: number
  totalContacts: number
  unreadContacts: number
  totalQuotes: number
  newQuotes: number
}

export type ActivityPayload = {
  stats: ActivityStats
  events: ActivityEvent[]
  generatedAt: string
}

const PER_TABLE = 15
const FEED_LIMIT = 30

export async function GET() {
  try {
    const [
      productCount,
      activeCount,
      contactCount,
      unreadCount,
      quoteCount,
      newQuoteCount,
      recentContacts,
      recentQuotes,
      recentProducts,
    ] = await Promise.all([
      supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
      supabaseAdmin.from('quotes').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('quotes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabaseAdmin
        .from('contact_submissions')
        .select('id, full_name, email, company, is_read, created_at')
        .order('created_at', { ascending: false })
        .limit(PER_TABLE),
      supabaseAdmin
        .from('quotes')
        .select('id, full_name, company, product_name, status, created_at')
        .order('created_at', { ascending: false })
        .limit(PER_TABLE),
      supabaseAdmin
        .from('products')
        .select('id, name, created_at, updated_at')
        .order('updated_at', { ascending: false })
        .limit(PER_TABLE),
    ])

    const events: ActivityEvent[] = []

    for (const c of recentContacts.data ?? []) {
      events.push({
        id: `contact-${c.id}`,
        type: 'contact',
        title: 'New contact enquiry',
        detail: `${c.full_name}${c.company ? ` · ${c.company}` : ''}`,
        at: c.created_at,
        href: '/admin/contacts',
        pending: !c.is_read,
      })
    }

    for (const q of recentQuotes.data ?? []) {
      events.push({
        id: `quote-${q.id}`,
        type: 'quote',
        title: 'New quote request',
        detail: `${q.full_name}${q.product_name ? ` · ${q.product_name}` : ''}`,
        at: q.created_at,
        href: '/admin/quotes',
        pending: q.status === 'new',
      })
    }

    for (const p of recentProducts.data ?? []) {
      const created = new Date(p.created_at).getTime()
      const updated = new Date(p.updated_at ?? p.created_at).getTime()
      // A row whose updated_at still matches created_at has only ever been
      // created, so emitting both would double-count it in the feed.
      const edited = Number.isFinite(updated) && updated - created > 1000

      events.push({
        id: `product-${edited ? 'upd' : 'new'}-${p.id}`,
        type: edited ? 'product_updated' : 'product_created',
        title: edited ? 'Product updated' : 'Product added',
        detail: p.name,
        at: edited ? p.updated_at : p.created_at,
        href: `/admin/products/${p.id}/edit`,
        pending: false,
      })
    }

    events.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())

    const payload: ActivityPayload = {
      stats: {
        totalProducts: productCount.count ?? 0,
        activeProducts: activeCount.count ?? 0,
        totalContacts: contactCount.count ?? 0,
        unreadContacts: unreadCount.count ?? 0,
        totalQuotes: quoteCount.count ?? 0,
        newQuotes: newQuoteCount.count ?? 0,
      },
      events: events.slice(0, FEED_LIMIT),
      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load activity' }, { status: 500 })
  }
}
