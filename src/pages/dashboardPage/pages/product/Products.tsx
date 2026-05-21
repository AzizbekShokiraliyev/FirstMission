import { Card, CardContent } from "@/components/ui/card"
import { CircleCheckBig, Package, ShoppingBag, type LucideIcon } from 'lucide-react';

import Search from "./components/Search";
import Filter from "./components/Filter";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setAllProducts } from "@/store/productSlice";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/store/apiSlice";



interface productInfo{
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
  const dispatch = useDispatch()
  const { data: products = [] } = useGetProductsQuery();

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setAllProducts(products));
    }
  }, [products, dispatch]);

  const allProducts = useSelector((state: RootState) => state.product.allProducts);

  const count = allProducts.length;
  
  const activeCount = allProducts.filter((item: unknown): item is Product => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'status' in item &&
    ((item as Product).status === "active" || (item as Product).status === "low-stock")
  );
}).length;


  const productInfo = [
    { title: "Jami mahsulotlar", count: count, icon: Package },
    { title: "Bugungi sotuv", count: "0", icon: ShoppingBag },
    { title: "Faol sotuvda", count: activeCount, icon: CircleCheckBig },
  ];

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