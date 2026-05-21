import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Edit from "./Edit";
import Delete from "./Delete";
import { useGetProductsQuery } from "@/store/apiSlice";
import type { RootState } from "@/store/store";

interface Product {
  id: string;
  name: string;
  description: string;
  count: number;
  status: string;
  price: number | string;
}

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetProductsQuery(undefined);

  // Redux state
  const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
  const sortBy = useSelector((state: RootState) => state.product.sortBy);

  const [currentPage, setCurrentPage] = useState<number>(1);
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

  return (
    <Card className="bg-slate-950 p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-800/30 text-white">
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Count</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((item: Product, idx: number) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-800/60 text-slate-300 hover:bg-slate-900/20"
              >
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {item.name}
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-slate-400">
                  {item.description}
                </TableCell>
                <TableCell>{item.count} ta</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full border px-2 py-1 text-[11px] font-bold ${
                      item.status === "active"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-emerald-400">{item.price}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border border-slate-800 bg-slate-900"
                    >
                      <Edit />
                      <DropdownMenuSeparator />
                      <Delete />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-6 text-center text-slate-400"
              >
                Product topilmadi
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={`cursor-pointer text-white ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                  className={`cursor-pointer ${currentPage === page ? "text-black" : "text-white"}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={`cursor-pointer text-white ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "text-white"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </Card>
  );
};

export default ProductList;