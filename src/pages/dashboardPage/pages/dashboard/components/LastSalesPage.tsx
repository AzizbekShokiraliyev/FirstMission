import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"


interface RecentActivityItem {
    id: number,
    text: string,
    time: string,
    type: string
 }

const LastSalesPage = () => {

    const recentActivities: RecentActivityItem[] = [
    { id: 1, text: "Yangi mahsulot qo'shildi: iPhone 16 Pro", time: "5 daqiqa avval", type: "create" },
    { id: 2, text: "Mahsulot narxi yangilandi: MacBook Air M3", time: "42 daqiqa avval", type: "update" },
    { id: 3, text: "Eski ma'lumotlar tizimdan o'chirildi", time: "2 soat avval", type: "delete" },
  ]

  return (
   <Card className="bg-slate-950 p-6">
      <CardHeader className="p-0 mb-4 border-b border-slate-700/70 pb-3 flex flex-row items-center gap-2 space-y-0">
          <Activity className="h-4 w-4 text-blue-500" />
            <CardTitle className="text-sm font-black tracking-wider uppercase text-slate-200">So'nggi Amallar</CardTitle>
              </CardHeader>

                <CardContent className="p-0 flex-1 space-y-4">
                {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs items-start">
                 <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 animate-pulse ${
                    act.type === 'create' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 
                    act.type === 'update' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 
                    'bg-red-500 shadow-lg shadow-red-500/50'}`} />
                 <div className="space-y-0.5">
                    <p className="text-slate-300 font-medium leading-relaxed">{act.text}</p>
                    <span className="text-[10px] text-slate-500 font-bold block">{act.time}</span>
                 </div>
                </div>
                ))}
      </CardContent>
    </Card>
  )
}

export default LastSalesPage
