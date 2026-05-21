import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MoreHorizontalIcon } from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet } from "@/components/ui/sheet";
import {useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation,} from "@/store/apiSlice";
import type { RootState } from "@/store/store";
import ActionDialog from "@/components/ActionDialog";
import { toast } from "sonner";

import { ProductForm } from "@/components/ProductForm";
import type { Product, ProductFormValues } from "@/components/ProductForm";

const ProductList = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery(undefined);
  const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
  const sortBy = useSelector((state: RootState) => state.product.sortBy);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const itemsPerPage = 10;

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((p: Product) =>
      (p.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const priceA = parseFloat(String(a.price || 0).replace(/[^0-9.]/g, "")) || 0;
      const priceB = parseFloat(String(b.price || 0).replace(/[^0-9.]/g, "")) || 0;

      if (sortBy === "high-to-low") return priceB - priceA;
      if (sortBy === "low-to-high") return priceA - priceB;
      return 0;
    });
  }, [products, searchQuery, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentItems = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <Card className="bg-slate-950 p-6 text-center text-slate-400">
        Ma&apos;lumotlar yuklanmoqda...
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-slate-950 p-6 text-center text-red-400">
        Xatolik yuz berdi!
      </Card>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast("Muvaffaqiyatli!", {
        description: "Mahsulot muvaffaqiyatli o'chirildi.",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi.";
      toast("Xatolik yuz berdi", { description: errorMessage });
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsSheetOpen(true);
  };

  const handleUpdate = async (data: ProductFormValues, status: string) => {
    if (!editingProduct?.id) return;

    try {
      await updateProduct({
        ...data,
        id: editingProduct.id,
        count: Number(data.count),
        price: Number(data.price),
        status,
      }).unwrap();

      toast("Muvaffaqiyatli!", {
        description: "Mahsulot muvaffaqiyatli yangilandi.",
      });

      setIsSheetOpen(false);
      setEditingProduct(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi.";
      toast("Xatolik yuz berdi", { description: errorMessage });
    }
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {editingProduct && (
          <ProductForm
            title="Mahsulotni tahrirlash"
            initialData={editingProduct}
            onSubmit={handleUpdate}
            isLoading={isUpdating}
          />
        )}
      </Sheet>

      <Card className="bg-slate-950 p-6">
        <div className="overflow-y-auto max-h-[43vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:]">
          <Table>
            <TableHeader className="sticky top-0 bg-slate-950 z-10">
              <TableRow className="border-b border-slate-800/30 hover:bg-transparent">
                <TableHead className="text-white w-[50px]">ID</TableHead>
                <TableHead className="text-white">Product</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">Count</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, idx) => (
                <TableRow key={item.id} className="border-b border-slate-800/60 text-slate-300 hover:bg-slate-900/20">
                  <TableCell>{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="font-semibold text-white">{item.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-slate-400">{item.description}</TableCell>
                  <TableCell>{item.count} ta</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-bold min-w-[80px] ${
                      item.status === "active" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
                      item.status === "low-stock" ? "border-orange-500/30 bg-orange-500/10 text-orange-400" :
                      "border-rose-500/30 bg-rose-500/10 text-rose-400"
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-emerald-400">{item.price}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontalIcon size={16} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                        <ActionDialog title="Tahrirlash" description="Tahrirlamoqchimisiz?" triggerText="Edit" actionText="Davom etish" onConfirm={() => handleEditClick(item)} />
                        <DropdownMenuSeparator />
                        <ActionDialog title="O'chirish" description="Rostdan ham o'chirmoqchimisiz?" triggerText="Delete" actionText="O'chirish" variant="destructive" onConfirm={() => handleDelete(item.id)} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={`cursor-pointer text-white ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}/>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer ${
                    currentPage === page ? "text-black" : "text-white"}`}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className={`cursor-pointer text-white ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "text-white"}`}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Card>
    </>
  );
};

export default ProductList;