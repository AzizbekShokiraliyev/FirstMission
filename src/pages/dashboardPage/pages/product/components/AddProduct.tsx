import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// 1. Oddiy va tushunarli Zod sxemasi
const productSchema = z.object({
  name: z.string().min(1, { message: "Mahsulot nomi majburiy" }),
  description: z.string().min(1, { message: "Tavsif majburiy" }),
  count: z.string().min(1, { message: "Soni majburiy" }),
  price: z.string().min(1, { message: "Narxi majburiy" }),
})

// TypeScript turi
type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("active")
  const status = [
    { title: "active" },
    { title: "low-stock" },
    { title: "draft" }
  ]

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      count: "",
      price: "",
    }
  })

  const onSubmit = (data: ProductFormValues) => {
    const finalData = { ...data, status: selectedStatus };
    console.log("Jo'natilgan ma'lumotlar:", finalData);
    
    reset(); 
    setIsOpen(false); 
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white h-11 px-4 font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
          <Plus /> Yangi mahsulot
        </Button>
      </SheetTrigger>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Yangi mahsulot qo'shish</SheetTitle>
          <SheetDescription>
            Yangi mahsulot ma'lumotlarini kiriting va saqlash tugmasini bosing
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[calc(100vh-120px)] justify-between py-6">
          <div className="grid flex-1 auto-rows-min gap-5 px-4 overflow-y-auto">
            
            <div className="grid gap-2">
              <Label htmlFor="name">Mahsulot nomi</Label>
              <Input id="name" type='text' placeholder='Mahsulot nomini yozing' {...register("name")} />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" type='text' placeholder='Tavsif yozing mahsulot uchun' {...register("description")} />
              {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="count">Count</Label>
              <Input id="count" type='number' placeholder='Mahsulot soni' {...register("count")} />
              {errors.count && <p className="text-xs text-red-500 font-medium">{errors.count.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <div className="flex flex-row items-center gap-3 w-full">
                {status.map((item, idx) => (
                  <Button 
                    key={idx} 
                    type="button" 
                    variant={selectedStatus === item.title ? "default" : "outline"} 
                    className="cursor-pointer flex-1" 
                    onClick={() => setSelectedStatus(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type='number' placeholder='Mahsulot narxi' {...register("price")} />
              {errors.price && <p className="text-xs text-red-500 font-medium">{errors.price.message}</p>}
            </div>

          </div>

          <SheetFooter className="pt-4 border-t border-slate-100 ">
            <Button type="submit" className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white">Save changes</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline" className="cursor-pointer">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default AddProduct