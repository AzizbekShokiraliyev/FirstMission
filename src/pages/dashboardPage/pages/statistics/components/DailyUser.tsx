import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/ui/card'

interface DailyAnalytics {
  sana: string,
  odamlar: number,
  sotilganProduct: number,
}

const DailyUser = () => {

    const dailyAnalytics: DailyAnalytics[] = [
      { sana: "05-11", odamlar: 1200, sotilganProduct: 45 },
      { sana: "05-12", odamlar: 1450, sotilganProduct: 52 },
      { sana: "05-13", odamlar: 1100, sotilganProduct: 38 },
      { sana: "05-14", odamlar: 1900, sotilganProduct: 85 },
      { sana: "05-15", odamlar: 1650, sotilganProduct: 61 },
      { sana: "05-16", odamlar: 2100, sotilganProduct: 90 },
      { sana: "05-17", odamlar: 1700, sotilganProduct: 74 },
    ];

  return (
    <Card className="bg-slate-950 p-5">
        <div className="pb-4">
          <h3 className="text-sm font-bold uppercase text-slate-200">Kunlik tashriflar oqimi</h3>
        </div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyAnalytics} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                  <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
               </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} vertical={false} />
                  <XAxis dataKey="sana" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "10px", color: "#fff" }} />
                  <Area type="monotone" dataKey="odamlar" stroke="#3b82f6" strokeWidth={2} fill="url(#trafficFill)" name="Kirganlar" />
            </AreaChart> 
          </ResponsiveContainer>
        </div>
      </Card>
  )
}

export default DailyUser