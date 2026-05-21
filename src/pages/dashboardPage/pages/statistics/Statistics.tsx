import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ShoppingBag, TrendingUp, Users } from "lucide-react"
import DailyUser from "./components/DailyUser";
import LowProductList from "./components/LowProductList";
import { useGetDashboardStatsQuery, useGetTodaySalesListQuery } from "@/store/apiSlice";

const Statistics = () => {
  const { data, isLoading: isStatsLoading } = useGetDashboardStatsQuery();
  const { data: salesList, isLoading: isSalesLoading } = useGetTodaySalesListQuery();
  const totalTodaySales = (salesList || []).reduce((acc, item) => acc + item.count, 0);
  const isLoading = isStatsLoading || isSalesLoading;

  const statsData = [
    { title: "Kunlik odam kirdi", count: data?.dailyUsers || 0, desc: "Bugungi jonli tashriflar", icon: Users},
    { title: "1 kunda sotildi", count: totalTodaySales, desc: "Oxirgi 24 soat ichida", icon: ShoppingBag}, 
    { title: "Omborda bor", count: data?.totalStock || 0, desc: "Barcha jami qoldiqlar", icon: TrendingUp},
    { title: "Haftada sotildi", count: data?.weeklySales || 0, desc: "Oxirgi 7 kunlik jami", icon: Calendar}
  ];

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <Card key={idx} className="bg-slate-900/50 text-white">
              <CardContent className='p-6 flex items-center justify-between gap-4'>
                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.title}</h4>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    {isLoading ? "..." : `${item.count.toLocaleString()} ta`}
                  </h1>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-blue-400">
                  <IconComponent size={22} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <DailyUser />
      </div>
      <LowProductList />
    </div>
  )
}

export default Statistics