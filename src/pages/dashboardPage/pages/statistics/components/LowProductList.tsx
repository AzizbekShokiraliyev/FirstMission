import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDraftProductsQuery } from "@/store/apiSlice";
import { AlertCircle} from "lucide-react"

const LowProductList = () => {

  const { data: draftProducts = [], isLoading } = useGetDraftProductsQuery();
  if (isLoading) return <div>Yuklanmoqda...</div>;

    const criticalLowStockProducts = draftProducts.filter(item => item.count < 10);

  return (
    <Card className="bg-slate-950 p-5">
      <CardHeader className="bg-slate-900 border-b border-slate-800 px-5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-rose-400 w-5 h-5 animate-pulse"/>
          <div>
            <CardTitle className="text-base font-bold text-rose-400 pt-4">Omborda kam qolgan mahsulotlar (Kritik holat)</CardTitle>
            <p className="text-[11px] text-slate-400 mt-0.5">Soni zudlik bilan 10 donadan kam qolgan barcha mahsulotlar avtomatik filtri</p>
          </div>
        </div>
        <Badge variant="destructive" className="px-2.5 py-0.5 font-bold">
          {criticalLowStockProducts.length} ta kritik mahsulot
        </Badge>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-800/30 bg-slate-900/10">
            <TableHead className="text-slate-400 font-semibold">Product</TableHead>
            <TableHead className="text-slate-400 font-semibold">Price</TableHead>
            <TableHead className="text-slate-400 font-semibold">Residual</TableHead>
            <TableHead className="text-slate-400 font-semibold text-right pr-6">Condition</TableHead>
          </TableRow>  
        </TableHeader>  

        <TableBody>
            {criticalLowStockProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500 text-sm">
                  Hamma narsa joyida! Omborda 10 tadan kam qolgan mahsulot mavjud emas.
                </TableCell>
              </TableRow>
            ) : (
              draftProducts.map((item) => (
                <TableRow key={item.id} className="border-b border-slate-800/20 hover:bg-slate-900/10 text-white h-14 transition-colors">
                  <TableCell className="font-medium text-slate-200">{item.name}</TableCell>
                  <TableCell className="text-slate-300 font-medium">{item.price}</TableCell>
                  
                  <TableCell className="font-extrabold text-amber-400">
                    {item.count} ta qoldi
                  </TableCell>
                  
                  <TableCell className="text-right pr-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-500/30 bg-red-500/10 text-red-400">
                      Sotib olish shart!
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
      </Table>      
    </Card>
  )
}

export default LowProductList
