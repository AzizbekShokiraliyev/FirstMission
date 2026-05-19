import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
} from "@/components/ui/pagination" 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontalIcon } from "lucide-react";
import type { RootState } from "../../../../../store/store";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  count: number;
  status: string;
  price: string;
}

const ProductList = () => {
  const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  const originalProducts: Product[] = [
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      description: "256GB, Natural Titanium, yangi avlod smartfoni",
      count: 450,
      status: "active",
      price: "$1,199"
    },
    {
      id: "2",
      title: "MacBook Air M3",
      description: "13-inch, 16GB RAM, 512GB SSD, Space Gray",
      count: 12, 
      status: "low-stock",
      price: "$1,299"
    },
    {
      id: "3",
      title: "AirPods Pro 2",
      description: "Type-C zaryadlash qutisi bilan, shovqinni bekor qilish tizimi",
      count: 718,
      status: "active",
      price: "$249"
    },
    {
      id: "4",
      title: "Apple Watch Series 9",
      description: "45mm Aluminum Case, Midnight Sport Band",
      count: 0, 
      status: "draft",
      price: "$399"
    },
    {
      id: "5",
      title: "Apple Watch Series 9",
      description: "45mm Aluminum Case, Midnight Sport Band",
      count: 0, 
      status: "draft",
      price: "$399"
    },
    {
      id: "6",
      title: "iPhone 14 Pro",
      description: "128GB, Deep Purple, ajoyib holatda",
      count: 5,
      status: "active",
      price: "$999"
    },
     {
      id: "7",
      title: "iPhone 15 Pro Max",
      description: "256GB, Natural Titanium, yangi avlod smartfoni",
      count: 450,
      status: "active",
      price: "$1,199"
    },
    {
      id: "8",
      title: "MacBook Air M3",
      description: "13-inch, 16GB RAM, 512GB SSD, Space Gray",
      count: 12, 
      status: "low-stock",
      price: "$1,299"
    },
    {
      id: "9",
      title: "AirPods Pro 2",
      description: "Type-C zaryadlash qutisi bilan, shovqinni bekor qilish tizimi",
      count: 718,
      status: "active",
      price: "$249"
    },
    {
      id: "10",
      title: "Apple Watch Series 9",
      description: "45mm Aluminum Case, Midnight Sport Band",
      count: 0, 
      status: "draft",
      price: "$399"
    },
    {
      id: "11",
      title: "iPhone 14 Pro",
      description: "128GB, Deep Purple, ajoyib holatda",
      count: 5,
      status: "active",
      price: "$999"
    },
     {
      id: "12",
      title: "iPhone 15 Pro Max",
      description: "256GB, Natural Titanium, yangi avlod smartfoni",
      count: 450,
      status: "active",
      price: "$1,199"
    },
    {
      id: "13",
      title: "MacBook Air M3",
      description: "13-inch, 16GB RAM, 512GB SSD, Space Gray",
      count: 12, 
      status: "low-stock",
      price: "$1,299"
    },
    {
      id: "14",
      title: "AirPods Pro 2",
      description: "Type-C zaryadlash qutisi bilan, shovqinni bekor qilish tizimi",
      count: 718,
      status: "active",
      price: "$249"
    },
    {
      id: "15",
      title: "Apple Watch Series 9",
      description: "45mm Aluminum Case, Midnight Sport Band",
      count: 0, 
      status: "draft",
      price: "$399"
    },
    {
      id: "16",
      title: "iPhone 14 Pro",
      description: "128GB, Deep Purple, ajoyib holatda",
      count: 5,
      status: "active",
      price: "$999"
    }
  ];

  const filteredProducts = originalProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Card className="bg-slate-950 border-slate-800 w-full p-6 border rounded-xl transition-colors space-y-6">
      <Table>
        <TableHeader className="hover:bg-slate-800">
          <TableRow className="border-b border-slate-800/30">
            <TableHead className="text-slate-200 font-semibold w-[60px]">Id</TableHead>
            <TableHead className="text-slate-200 font-semibold w-[180px]">Product</TableHead>
            <TableHead className="text-slate-200 font-semibold">Description</TableHead>
            <TableHead className="text-slate-200 font-semibold w-[100px]">Count</TableHead>
            <TableHead className="text-slate-200 font-semibold w-[120px]">Status</TableHead>
            <TableHead className="text-slate-200 font-semibold w-[100px]">Price</TableHead>
            <TableHead className="text-slate-200 font-semibold w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                Mahsulot topilmadi.
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((item) => (
              <TableRow key={item.id} className="border-b border-slate-800/60 hover:bg-slate-900/20 text-slate-300 h-14">
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-semibold text-white">{item.title}</TableCell>
                <TableCell className="text-slate-400 max-w-[300px] truncate">{item.description}</TableCell>
                <TableCell>{item.count} ta</TableCell>
                <TableCell>
                  <span className={`
                    flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border w-20 h-6 
                    ${item.status === "active" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : 
                      item.status === "low-stock" ? "border-amber-500/30 bg-amber-500/10 text-amber-400" : 
                      "border-rose-800 bg-rose-900 text-white"
                    }
                  `}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-emerald-400 font-medium">{item.price}</TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-black">
                        <MoreHorizontalIcon size={16} />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                      <DropdownMenuItem className="cursor-pointer focus:bg-slate-800 focus:text-white">Edit</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <DropdownMenuItem variant="destructive" className="cursor-pointer">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="pt-2 border-slate-900 text-white">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                        onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}
                      className={`cursor-pointer ${currentPage === pageNumber ? "text-black bg-white" : "text-slate-400"}`}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default ProductList;