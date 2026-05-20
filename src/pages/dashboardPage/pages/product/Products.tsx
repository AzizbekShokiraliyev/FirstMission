import { Card, CardContent } from "@/components/ui/card"
import { CircleCheckBig, Package, ShoppingBag, type LucideIcon } from 'lucide-react';

import Search from "./components/Search";
import Filter from "./components/Filter";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";



interface ProductInfo{
  title: string,
  count: string | number,
  icon: LucideIcon,
}

interface Product {
  id: string;
  name: string;
  description: string;
  count: number;
  status: string; 
  price: number | string;
}

const Products = () => {

  const AllProducts = useSelector((state: RootState) => state.product.allProducts)

  const count = AllProducts.length
  const activeCount = AllProducts.filter(
  (item: unknown) => (item as Product).status === "active" || (item as Product).status === "low-stock").length;

  const productInfo: ProductInfo[] = [
    {title: "Jami mahsulotlar", count: count, icon: Package,},
    {title: "Bugungi sotuv", count: "0", icon: ShoppingBag,},
    {title: "Faol sotuvda", count: activeCount, icon: CircleCheckBig,},
  ]

  useEffect(() => {
    
  })

  return (
    <div className="space-y-6 animate-fade-in text-white w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productInfo.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <Card key={idx} className="bg-slate-900 backdrop-blur-md border-slate-800 shadow-xl shadow-black/20 transition-all duration-300 group rounded-2xl">
              <CardContent className="p-6 items-center flex gap-3">
                <div className="text-white"><IconComponent size={32}/></div>
                <div >
                  <h2 className="text-[14px] font-bold text-slate-400 tracking-wider uppercase truncate">{item.title}</h2>
                  <h1 className="text-xl font-extrabold text-white tracking-tight">{item.count} ta</h1>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Search/>
        <Filter/>
        <AddProduct/>
      </div>
        <ProductList/>
    </div>
  )
}

export default Products