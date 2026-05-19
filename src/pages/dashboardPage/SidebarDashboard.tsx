import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutDashboard, SquareChartGantt, BarChart3, LogOut, type LucideIcon, User} from "lucide-react"
import { Link, useLocation } from "react-router-dom"


interface menuItems {
    title: string,
    icon: LucideIcon,
    url: string,
    isActive?: boolean
}


const menuItems: menuItems[] = [
  {
    title: "DASHBOARD",
    icon: LayoutDashboard,
    url: "/dashboard", 
  },
  {
    title: "PRODUCT",
    icon: SquareChartGantt,
    url: "/dashboard/products", 
  },
  {
    title: "STATISTICS",
    icon: BarChart3,
    url: "/dashboard/statistics", 
  },
  {
    title: "Profile",
    icon: User,
    url: "/dashboard/profile", 
  },
]

const SidebarDashboard = () => {
    const location = useLocation()


  return (
    <Sidebar variant="sidebar" className="!bg-[#0B0E14] border-r border-slate-900/60 text-white" style={{ "--sidebar-background": "#0B0E14" } as React.CSSProperties}>
        <SidebarHeader className="!bg-[#0B0E14]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
          P
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wider text-white uppercase flex items-center">
              Pro<span className="text-blue-500">Dev</span>
            </h2>
          </div>
        </div>
        </SidebarHeader>

        <SidebarContent className="!bg-[#0B0E14]">
            <SidebarGroup>
                <SidebarGroupLabel className="text-blue-500">
                    Asosiy Menu
                </SidebarGroupLabel>
            </SidebarGroup>

        <SidebarGroupContent>
            <SidebarMenu>
                {menuItems.map((item) => {
                    const isCurrentActive = location.pathname === item.url

                    return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className={`w-full flex items-center px-3 py-6 rounded-xl transition-all duration-200 group ${isCurrentActive 
                                    ? "bg-gradient-to-r from-blue-600/10 to-transparent border border-white/10 text-white" 
                                    : "text-slate-400 hover:bg-white/[0.03] hover:text-white border border-transparent"
                                }`}
                            >
                            <Link to={item.url} className="flex items-center w-full gap-3">
                                <item.icon className={`h-5 w-5 ${isCurrentActive ? "text-blue-500" : "text-slate-500"}`} />
                                <span className="text-xs font-bold tracking-wider">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarContent>

         <SidebarFooter className="p-4 border-t border-slate-900/50 !bg-[#0B0E14]">
        <SidebarMenu>
          <SidebarMenuItem>
           <Link to='/login'>
               <SidebarMenuButton
              className="w-full flex items-center gap-3 px-3 py-6 text-red-500 hover:bg-red-950/20 hover:text-red-400 rounded-xl transition-colors font-bold text-xs tracking-wider cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              <span>TIZIMDAN CHIQISH</span>
            </SidebarMenuButton>
           </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}

export default SidebarDashboard
