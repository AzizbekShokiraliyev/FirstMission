import SidebarDashboard from './SidebarDashboard'
import HeaderDashboard from './HeaderDashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <SidebarProvider className="flex min-h-screen bg-[#0B0E14] text-white antialiased">
      <SidebarDashboard />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <HeaderDashboard />
        <main className="flex-1 p-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardPage