import { useGetVisitorStatsQuery } from "@/store/apiSlice";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DailyUser = () => {
  const { data, isLoading } = useGetVisitorStatsQuery();

  if (isLoading) {
    return <div className="text-white">Grafik yuklanmoqda...</div>;
  }

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-white font-bold mb-4">KUNLIK TASHRIFLAR OQIMI</h2>
      
      <ResponsiveContainer height={250}>
        <AreaChart data={data || []}>
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} 
            itemStyle={{ color: '#fff' }}/>
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#3b82f6" 
            fill="#1e293b" 
            strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyUser;