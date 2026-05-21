import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export interface Product {
  id?: string;
  name: string;
  description: string;
  count: number | string;
  price: number | string;
  status: string;
}

const productSchema = z.object({
  name: z.string().min(1, { message: "Mahsulot nomi majburiy" }),
  description: z.string().min(1, { message: "Tavsif majburiy" }),
  count: z.string().min(1, { message: "Soni majburiy" }),
  price: z.string().min(1, { message: "Narxi majburiy" }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues, status: string) => void;
  isLoading: boolean;
  title: string;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  isLoading,
  title,
}: ProductFormProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialData?.status || "active"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      count: initialData ? String(initialData.count) : "",
      price: initialData ? String(initialData.price) : "",
    },
  });

  const statuses = [
    { title: "active" },
    { title: "low-stock" },
    { title: "draft" },
  ];

  return (
    <SheetContent className="bg-slate-900">
      <SheetHeader>
        <SheetTitle className="text-white">{title}</SheetTitle>
        <SheetDescription>
          {initialData
            ? "Mahsulot ma'lumotlarini tahrirlang va saqlang."
            : "Yangi mahsulot ma'lumotlarini kiriting va saqlash tugmasini bosing."}
        </SheetDescription>
      </SheetHeader>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, selectedStatus))}
        className="flex h-[calc(100vh-120px)] flex-col justify-between py-6"
      >
        <div className="grid flex-1 auto-rows-min gap-5 overflow-y-auto px-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white">
              Mahsulot nomi
            </Label>
            <Input
              id="name"
              placeholder="Mahsulot nomini yozing"
              className="text-white"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Tavsif yozing mahsulot uchun"
              className="text-white"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs font-medium text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="count" className="text-white">
              Count
            </Label>
            <Input
              id="count"
              type="number"
              placeholder="Mahsulot soni"
              className="text-white"
              {...register("count")}
            />
            {errors.count && (
              <p className="text-xs font-medium text-red-500">
                {errors.count.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <Label className="text-white">Status</Label>
            <div className="flex w-full flex-row items-center gap-3">
              {statuses.map((item) => (
                <Button
                  key={item.title}
                  type="button"
                  variant="ghost"
                  className={`flex-1 rounded-full border ${
                    selectedStatus === item.title
                      ? "border-transparent bg-white text-black"
                      : "border-muted-foreground/40 text-white hover:border-muted-foreground"
                  }`}
                  onClick={() => setSelectedStatus(item.title)}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <Label htmlFor="price" className="text-white">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Mahsulot narxi"
              className="text-white"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-xs font-medium text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <SheetFooter className="border-t border-slate-800 pt-4">
          <Button
            type="submit"
            className="bg-blue-700 text-white hover:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Saqlanmoqda..." : "Save changes"}
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </SheetContent>
  );
};