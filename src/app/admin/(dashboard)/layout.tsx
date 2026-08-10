import AdminSidebar from '../_components/AdminSidebar'
import AdminHeader from '../_components/AdminHeader'
import ActivityProvider from '../_components/ActivityProvider'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // One poll at the layout level feeds both the header bell and the
    // dashboard cards, so they never double-request.
    <ActivityProvider>
      <div className="flex min-h-screen" style={{ background: '#F5F7FA', fontFamily: 'var(--font-poppins, Poppins, sans-serif)' }}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col pl-60 min-h-screen">
          <AdminHeader />
          <main className="flex-1 p-6 lg:p-8">
            <div className="w-full max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ActivityProvider>
  )
}
