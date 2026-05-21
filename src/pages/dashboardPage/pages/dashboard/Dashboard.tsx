import { Card, CardContent } from '@/components/ui/card'
import { LayoutDashboard, ShoppingBag, Users, type LucideIcon } from 'lucide-react' // ✅ Activity to'g'ri joydan import qilindi
import WeeklyStatistics from './components/WeeklyStatistics'
import LastSalesPage from './components/LastSalesPage'
import MostSelling from './components/MostSelling'

 interface StatItem {
    title: string,
    value: string,
    icon: LucideIcon,
    change: string,
    color: string
 }

const Dashboard = () => {

    const stats: StatItem[] = [
    { title: "Jami Savdo", value: "$24,500", change: "+12.5%", icon: LayoutDashboard, color: "text-blue-500" },
    { title: "Mahsulotlar", value: "1,240 ta", change: "+4.2%", icon: ShoppingBag, color: "text-emerald-500" },
    { title: "Aktiv Adminlar", value: "3 ta", change: "0%", icon: Users, color: "text-amber-500" },
  ]
    
  return (
    <div className='space-y-6'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon
                return(
                <Card key={idx} className="bg-slate-900/50">

                <CardContent className='p-6 flex items-center justify-between'>
                    <div className='space-y-2'>
                        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                        <IconComponent size={24} className="shrink-0 text-slate-500" />
                        <span>{stat.title}</span>
                        </p>
                        <h3 className="text-2xl font-black tracking-tight text-white">{stat.value}</h3>
                        <span className={`text-xs font-bold flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {stat.change} <span className="text-slate-500 font-normal">bu oy</span>
                        </span>
                    </div>
                </CardContent>
                </Card>
            )})}
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <WeeklyStatistics/>
            <LastSalesPage/>
        </div>
            <MostSelling/>
    </div>
  )
}

export default Dashboard
