import AdminSidebar from '../_components/AdminSidebar'
import AdminHeader from '../_components/AdminHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#F5F7FA', fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col pl-60 min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
