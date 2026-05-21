import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, ShoppingBag, CircleCheckBig, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Search from "./components/Search";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";
import { ProductForm, type ProductFormValues } from "@/components/ProductForm";
import type { RootState } from "@/store/store";
import { setAllProducts } from "@/store/productSlice";
import {useAddProductMutation, useGetProductsQuery, useGetTodaySalesQuery,} from "@/store/apiSlice";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  count: number;
  status: "active" | "low-stock" | "draft";
  price: number | string;
}

const Products = () => {
  const dispatch = useDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: products = [] } = useGetProductsQuery(undefined);
  const { data: todaySales = 0 } = useGetTodaySalesQuery(undefined);

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setAllProducts(products));
    }
  }, [products, dispatch]);

  const allProducts = useSelector(
    (state: RootState) => state.product.allProducts as Product[]
  );

  const count = allProducts.length;
  const activeCount = allProducts.filter(
    (item) => item.status === "active" || item.status === "low-stock"
  ).length;

  const handleAddProduct = async (data: ProductFormValues, status: string) => {
    try {
      await addProduct({
        ...data,
        count: Number(data.count),
        price: Number(data.price),
        status,
      }).unwrap();

      toast("Muvaffaqiyatli!", {
        description: "Yangi mahsulot muvaffaqiyatli qo'shildi",
      });

      setIsSheetOpen(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi";
      toast("Xatolik yuz berdi", { description: errorMessage });
    }
  };

  const productInfo = [
    { title: "Jami mahsulotlar", count, icon: Package },
    { title: "Bugungi sotuv", count: todaySales, icon: ShoppingBag},
    { title: "Faol sotuvda", count: activeCount, icon: CircleCheckBig},
  ];

  return (
    <div className="space-y-6 animate-fade-in text-white w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productInfo.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <Card key={idx} className="bg-slate-900 border-slate-800 rounded-2xl">
              <CardContent className="p-6 flex items-center gap-3">
                <div className="text-white">
                  <IconComponent size={32} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-400 uppercase">
                    {item.title}
                  </h2>
                  <h1 className="text-xl font-extrabold text-white">
                    {item.count} ta
                  </h1>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Search />
        <Filter />

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="bg-green-500 font-bold hover:bg-green-600">
              <Plus className="mr-1" size={18} />
              Yangi mahsulot
            </Button>
          </SheetTrigger>

          <ProductForm
            title="Yangi mahsulot qo'shish"
            isLoading={isAdding}
            onSubmit={handleAddProduct}
          />
        </Sheet>

      </div>
      <ProductList/>
    </div>
  );
};

export default Products;