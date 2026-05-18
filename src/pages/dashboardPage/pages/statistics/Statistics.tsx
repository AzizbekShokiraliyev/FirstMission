import { Card, CardContent} from "@/components/ui/card"
import { Calendar, ShoppingBag, TrendingUp, Users, type LucideIcon } from "lucide-react"
import DailyUser from "./components/DailyUser";
import DailySoldProduct from "./components/DailySoldProduct";
import LowProductList from "./components/LowProductList";

interface StatItem {
  title: string;
  count: string;
  desc: string;
  icon: LucideIcon; 
}

const Statistics = () => {

  const statistika: StatItem[] = [
  { title: "Kunlik odam kirdi", count: "1,700", desc: "Bugungi jonli tashriflar", icon: Users },
  { title: "1 kunda sotildi", count: "74", desc: "Oxirgi 24 soat ichida", icon: ShoppingBag },
  { title: "Omborda bor", count: "445", desc: "Barcha jami qoldiqlar", icon: TrendingUp },
  { title: "Haftada sotildi", count: "1,318", desc: "Oxirgi 7 kunlik jami", icon: Calendar },
]

  return (
    <div className="w-full space-y-6 text-white animate-fade-in p-1">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {statistika.map((item, idx) => {
        const IconComponent = item.icon
        
        return (
          <Card key={idx} className="bg-slate-900/50 backdrop-blur-md border-slate-800/60 shadow-xl shadow-black/20 transition-all duration-300 group rounded-2xl text-white">
            <CardContent className='p-6 flex items-center justify-between gap-4'>
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.title}</h4>
                <h1 className="text-2xl font-black text-white tracking-tight">{item.count} ta</h1>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              
              <div className="p-3 bg-slate-800/50 border border-slate-700/30 rounded-xl text-blue-400 shrink-0">
                <IconComponent size={22} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyUser/>
        <DailySoldProduct/>
    </div>
        <LowProductList/>
    </div>
    
  )
}

export default Statistics