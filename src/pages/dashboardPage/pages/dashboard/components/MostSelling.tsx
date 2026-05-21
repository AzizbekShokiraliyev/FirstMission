import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { useGetProductsQuery } from '@/store/apiSlice';


const MostSelling = () => {
 const { data: products = [], isLoading } = useGetProductsQuery();

  const topProducts = [...products]
    .sort((a, b) => Number(b.count || 0) - Number(a.count || 0)) 
    .slice(0, 3);

  if (isLoading) return <div className="text-white">Yuklanmoqda...</div>;

  return (
    <Card className="bg-slate-950">
        <CardHeader className="p-0 mb-5 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-sm font-black tracking-wider uppercase text-slate-200">Ommabop Mahsulotlar</CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-1">Hozirda eng ko'p sotilayotgan va talab yuqori bo'lgan mahsulotlar</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto select-none">
          <Table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700/70">
                <th className="pb-3 pt-2 font-black">Mahsulot</th>
                <th className="pb-3 pt-2 font-black">Kategoriya</th>
                <th className="pb-3 pt-2 font-black">Narxi</th>
                <th className="pb-3 pt-2 font-black">Sotildi</th>
                <th className="pb-3 pt-2 font-black text-right">Zaxira (Stock)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40">
               {topProducts.map((prod) => (
                 <tr key={prod.id}>
                   <td className="py-3.5 font-bold text-white">{prod.name}</td>
                   <td className="py-3.5 text-slate-400 font-medium">{prod.description || "N/A"}</td>
                   <td className="py-3.5 font-bold text-slate-200">${prod.price}</td>
                   <td className="py-3.5 font-black text-emerald-500">{prod.count} ta</td>
                   <td className="py-3.5 text-right">
                     <span className={`px-2.5 py-1 rounded-lg ... ${
                       prod.count < 5 ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                       {prod.count > 0 ? `${prod.count} ta qoldi` : "Tugagan"}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
          </Table>
        </CardContent>
      </Card>
  )
}

export default MostSelling




