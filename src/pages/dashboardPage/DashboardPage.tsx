import SidebarDashboard from './SidebarDashboard'
import HeaderDashboard from './HeaderDashboard'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner" // 1. Import qiling

const DashboardPage = () => {
  return (
    <SidebarProvider className="flex min-h-screen bg-[#0B0E14]">
      <SidebarDashboard />
      <div className="flex flex-col flex-1">
        <HeaderDashboard />
        <main className="flex-1 p-6 space-y-6">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  )
}

export default DashboardPage