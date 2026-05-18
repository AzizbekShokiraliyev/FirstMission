import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle} from "lucide-react"

interface AllProducts {
  id: string, 
  title: string, 
  count: number, 
  price: string
}

const LowProductList = () => {

    const allProducts: AllProducts[] = [
    { id: "P001", title: "iPhone 15 Pro Max", count: 450, price: "$1,199" },
    { id: "P002", title: "MacBook Air M3", count: 8, price: "$1,299" },     
    { id: "P003", title: "AirPods Pro 2", count: 718, price: "$249" },
    { id: "P004", title: "Apple Watch Series 9", count: 3, price: "$399" },  
    { id: "P005", title: "iPad Pro M4", count: 5, price: "$999" },           
    { id: "P006", title: "Apple Pencil Pro", count: 120, price: "$129" },
    { id: "P007", title: "Magic Keyboard", count: 14, price: "$299" },
    ];

    const criticalLowStockProducts = allProducts.filter(item => item.count < 10);

  return (
    <Card className="bg-slate-950 backdrop-blue-md border-slate-800 rounded-2xl p-5 text-white">
      <CardHeader className="bg-slate-900 border-b border-slate-800 px-5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-rose-400 w-5 h-5 animate-pulse"/>
          <div>
            <CardTitle className="text-base font-bold text-rose-400">Omborda kam qolgan mahsulotlar (Kritik holat)</CardTitle>
            <p className="text-[11px] text-slate-400 mt-0.5">Soni zudlik bilan 10 donadan kam qolgan barcha mahsulotlar avtomatik filtri</p>
          </div>
        </div>
        <Badge variant="destructive" className="rounded-lg px-2.5 py-0.5 font-bold text-xs bg-red-500/20 text-red-400 border border-500/30">
          {criticalLowStockProducts.length} ta kritik mahsulot
        </Badge>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-800/30 bg-slate-900/10">
            <TableHead className="text-slate-400 font-semibold w-[100px]">Id</TableHead>
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
              criticalLowStockProducts.map((item) => (
                <TableRow key={item.id} className="border-b border-slate-800/20 hover:bg-slate-900/10 text-white h-14 transition-colors">
                  <TableCell className="font-mono text-slate-500 text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium text-slate-200">{item.title}</TableCell>
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
