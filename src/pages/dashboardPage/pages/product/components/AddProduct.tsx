import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAddProductMutation } from "@/store/apiSlice";

const productSchema = z.object({
  name: z.string().min(1, { message: "Mahsulot nomi majburiy" }),
  description: z.string().min(1, { message: "Tavsif majburiy" }),
  count: z
    .string()
    .min(1, { message: "Soni majburiy" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "To'g'ri son kiriting",
    }),
  price: z
    .string()
    .min(1, { message: "Narxi majburiy" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "To'g'ri narx kiriting",
    }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [addProduct, { isLoading }] = useAddProductMutation();

  const statuses = [
    { title: "active" },
    { title: "low-stock" },
    { title: "draft" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      count: "",
      price: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const finalData = {
        name: data.name,
        description: data.description,
        count: Number(data.count),
        status: selectedStatus,
        price: Number(data.price),
      };

      await addProduct(finalData).unwrap();

      toast.success("Muvaffaqiyatli!", {
        description: "Mahsulot muvaffaqiyatli qo'shildi.",
      });

      reset();
      setSelectedStatus("active");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Xatolik yuz berdi", {
        description: "Mahsulotni saqlashda muammo bo'ldi.",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 font-semibold text-white"
        >
          <Plus />
          Yangi mahsulot
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-slate-900">
        <SheetHeader>
          <SheetTitle className="text-white">Yangi mahsulot qo'shish</SheetTitle>
          <SheetDescription>
            Yangi mahsulot ma&apos;lumotlarini kiriting va saqlash tugmasini bosing.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-[calc(100vh-120px)] flex-col justify-between py-6"
        >
          <div className="grid flex-1 auto-rows-min gap-5 overflow-y-auto px-4">
            {/* NAME */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white">Mahsulot nomi</Label>
              <Input
                id="name"
                placeholder="Mahsulot nomini yozing"
                className="text-white"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                id="description"
                placeholder="Tavsif yozing mahsulot uchun"
                className="text-white"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* COUNT */}
            <div className="grid gap-2">
              <Label htmlFor="count" className="text-white">Count</Label>
              <Input
                id="count"
                type="number"
                placeholder="Mahsulot soni"
                className="text-white"
                {...register("count")}
              />
              {errors.count && (
                <p className="text-xs font-medium text-red-500">{errors.count.message}</p>
              )}
            </div>

            {/* STATUS */}
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

            {/* PRICE */}
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-white">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Mahsulot narxi"
                className="text-white"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs font-medium text-red-500">{errors.price.message}</p>
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
              <Button type="button" variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddProduct;