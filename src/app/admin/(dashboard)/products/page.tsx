import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Plus } from 'lucide-react'
import ProductActions from './_components/ProductActions'

export default async function AdminProductsPage() {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: '#6B7A99' }}>{products?.length ?? 0} product{products?.length !== 1 ? 's' : ''} total</p>
        <a
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all hover:brightness-110 cursor-pointer"
          style={{ background: '#F5A623', color: '#0D1B4B' }}
        >
          <Plus size={15} /> Add Product
        </a>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto" style={{ border: '1px solid rgba(26,43,94,0.07)' }}>
        {!products || products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-sans text-sm" style={{ color: '#6B7A99' }}>No products yet.</p>
            <a href="/admin/products/new" className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold" style={{ color: '#0070C0' }}>
              <Plus size={14} /> Add your first product
            </a>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(26,43,94,0.07)', background: '#F8F9FB' }}>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Product</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest hidden sm:table-cell" style={{ color: '#6B7A99' }}>Category</th>
                <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest hidden md:table-cell" style={{ color: '#6B7A99' }}>Tag</th>
                <th className="text-center px-4 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Status</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: '#6B7A99' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors" style={{ borderColor: 'rgba(26,43,94,0.06)' }}>
                  <td className="px-5 py-3.5">
                    <p className="font-sans font-semibold" style={{ color: '#1A2B5E' }}>{p.name}</p>
                    {p.code && <p className="font-mono text-[10px] mt-0.5" style={{ color: '#F5A623' }}>{p.code}</p>}
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider capitalize"
                      style={{ background: p.category === 'marine' ? 'rgba(0,112,192,0.10)' : 'rgba(245,166,35,0.10)', color: p.category === 'marine' ? '#0070C0' : '#B45309' }}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-xs" style={{ color: '#6B7A99' }}>{p.tag}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.is_active ? '#10B981' : '#CBD5E1' }} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <ProductActions id={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
