import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table } from '@/components/ui/table'

interface TopProducts {
     id: number, 
     name: string, 
     category: string, 
     price: string, 
     sales: string, 
     stock: string   
}


const MostSelling = () => {

    const topProducts: TopProducts[] = [
    { id: 1, name: "iPhone 16 Pro Max", category: "Elektronika", price: "$1,199", sales: "142 ta", stock: "12 ta qoldi" },
    { id: 2, name: "MacBook Pro M3 Max", category: "Noutbuklar", price: "$2,499", sales: "68 ta", stock: "5 ta qoldi" },
    { id: 3, name: "AirPods Pro 2", category: "Aksessuarlar", price: "$249", sales: "310 ta", stock: "Sotuvda bor" },
 ]

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
                  <td className="py-3.5 font-bold text-white transition-colors">{prod.name}</td>
                  <td className="py-3.5 text-slate-400 font-medium">{prod.category}</td>
                  <td className="py-3.5 font-bold text-slate-200">{prod.price}</td>
                  <td className="py-3.5 font-black text-emerald-500">{prod.sales}</td>
                  <td className="py-3.5 text-right">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border tracking-wide uppercase ${
                      prod.stock.includes('qoldi') 
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                        : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {prod.stock}
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
