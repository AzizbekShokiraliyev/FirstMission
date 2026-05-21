import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetTodaySalesListQuery } from "@/store/apiSlice";
import { Activity } from "lucide-react"

const LastSalesPage = () => {
  const { data: salesList = [] } = useGetTodaySalesListQuery()

  return (
   <Card className="bg-slate-950 p-6">
      <CardHeader className="p-0 mb-4 border-b border-slate-700/70 pb-3 flex flex-row items-center gap-2 space-y-0">
          <Activity className="h-4 w-4 text-blue-500" />
            <CardTitle className="text-sm font-black tracking-wider uppercase text-slate-200">So'nggi Amallar</CardTitle>
              </CardHeader>
                <CardContent className="p-0 flex-1 space-y-4">
                {salesList.map((sale) => (
                <div key={sale.id} className="flex gap-3 text-xs items-start">
                  <div className="h-2 w-2 rounded-full mt-1.5 bg-emerald-500 animate-pulse" />
                   <div className="space-y-0.5">
                      <p className="text-slate-300 font-medium">{sale.name} - {sale.count} ta sotildi</p>
                      <span className="text-[10px] text-slate-500 font-bold">Bugun</span>
                    </div>
                </div>
              ))}
      </CardContent>
    </Card>
  )
}

export default LastSalesPage
