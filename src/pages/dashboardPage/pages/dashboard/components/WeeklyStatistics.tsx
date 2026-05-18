import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

interface ChartData{
    name: string,
    amallar: number,
}

const WeeklyStatistics = () => {

const chartData: ChartData[] = [
  { name: "Dush", amallar: 30 },
  { name: "Sesh", amallar: 45 },
  { name: "Chor", amallar: 35 },
  { name: "Pay", amallar: 60 },
  { name: "Jum", amallar: 49 },
  { name: "Shan", amallar: 75 },
  { name: "Yak", amallar: 55 },
 ]

  return (
    <Card className='lg:col-span-2 bg-slate-950 backdrop-blur-md border-slate-900/60 p-6 rounded-2xl flex flex-col justify-between min-h-[350px] shadow-xl shadow-black/20'>
                <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle className="text-sm font-black tracking-wider uppercase text-slate-200">Tizim Statistikasi</CardTitle>
                        <CardDescription className="text-xs text-slate-400 mt-1">Haftalik amallar dinamikasi</CardDescription>
                    </div>
                    <Button className="text-xs text-blue-500 font-bold flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none">
                        Batafsil <ArrowUpRight className="h-3 w-3" />
                    </Button>
                </CardHeader>


                <div className='felx-1 w-full h-[230px] min-h-[230px]'>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                        <linearGradient id="colorAmallar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                        itemStyle={{ color: "#3b82f6" }}
                        />
                        <Area 
                        type="monotone" 
                        dataKey="amallar" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorAmallar)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>

            </Card>
  )
}

export default WeeklyStatistics
