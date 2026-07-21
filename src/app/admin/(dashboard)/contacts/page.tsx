import { supabaseAdmin } from '@/lib/supabaseAdmin'
import ContactActions from './_components/ContactActions'

export const dynamic = 'force-dynamic'

export default async function AdminContactsPage() {
  const { data: contacts } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const unread = (contacts ?? []).filter(c => !c.is_read).length

  return (
    <div>
      <div className="mb-5">
        <p className="text-sm" style={{ color: '#6B7A99' }}>
          {contacts?.length ?? 0} total ·{' '}
          {unread > 0 ? <span style={{ color: '#EF4444' }}>{unread} unread</span> : <span style={{ color: '#10B981' }}>all read</span>}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        {!contacts || contacts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-sans text-sm" style={{ color: '#6B7A99' }}>No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
            {contacts.map((c) => (
              <div
                key={c.id}
                className="px-5 py-4 transition-colors"
                style={{ background: !c.is_read ? 'rgba(245,166,35,0.03)' : 'transparent' }}
              >
                <div className="flex items-start gap-3">
                  {/* Unread dot */}
                  <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: !c.is_read ? '#F5A623' : 'transparent', border: c.is_read ? '1.5px solid #CBD5E1' : 'none' }} />

                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                      <span className="font-sans font-black text-sm" style={{ color: '#1A2B5E' }}>{c.full_name}</span>
                      {c.company && <span className="font-sans text-xs" style={{ color: '#6B7A99' }}>{c.company}</span>}
                      <span className="font-sans text-xs" style={{ color: '#9CAABB' }}>{c.email}</span>
                      <span className="ml-auto font-mono text-[10px] shrink-0" style={{ color: '#9CAABB' }}>
                        {new Date(c.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}
                        {new Date(c.created_at).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Message */}
                    <p className="font-sans text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#475569' }}>{c.message}</p>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-3">
                      <a
                        href={`mailto:${c.email}?subject=Re: Your enquiry&body=Hi ${c.full_name},%0D%0A%0D%0AThank you for reaching out to Clincorps.`}
                        className="text-xs font-semibold transition-colors cursor-pointer"
                        style={{ color: '#0070C0' }}
                      >
                        Reply via email
                      </a>
                      <ContactActions id={c.id} isRead={c.is_read} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
