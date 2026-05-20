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
import { createProduct } from '@/lib/productApi'
import { triggerRefresh } from '@/store/productSlice'
import { useDispatch } from 'react-redux'

const productSchema = z.object({
  name: z.string().min(1, { message: "Mahsulot nomi majburiy" }),
  description: z.string().min(1, { message: "Tavsif majburiy" }),
  count: z.string()
    .min(1, { message: "Soni majburiy" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, { message: "To'g'ri son kiriting" }),
  price: z.string()
    .min(1, { message: "Narxi majburiy" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, { message: "To'g'ri narx kiriting" }),
})
type ProductFormValues = z.infer<typeof productSchema>;

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("active")
  const status = [
    { title: "active" },
    { title: "low-stock" },
    { title: "draft" }
  ]
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      count: "",
      price: "",
    }
  })

  const onSubmit = async (data: ProductFormValues) => {
    const timestamp = new Date().getTime(); 
    const customId = `prod_${timestamp}`;

    const finalDate = {
      ...data,
      status: selectedStatus,
      price: Number(data.price),
      count: Number(data.count),
    };

    try {
      const success = await createProduct(customId, finalDate)

      if (success) {
        alert("Mahsulot muvaffaqiyatli qo'shildi!"); 
        reset(); 
        setSelectedStatus("active"); 
        setIsOpen(false);
      }else {
        alert("Mahsulotni saqlashda xatolik yuz berdi.");
      }

    } catch (error) {
      console.error("Xatolik:", error);
    }

    dispatch(triggerRefresh());

  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white h-11 px-4 font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
          <Plus /> Yangi mahsulot
        </Button>
      </SheetTrigger>
      
      <SheetContent className='bg-slate-900'>
        <SheetHeader>
          <SheetTitle className='text-white'>Yangi mahsulot qo'shish</SheetTitle>
          <SheetDescription>
            Yangi mahsulot ma'lumotlarini kiriting va saqlash tugmasini bosing
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[calc(100vh-120px)] justify-between py-6">
          <div className="grid flex-1 auto-rows-min gap-5 px-4 overflow-y-auto">
            
            <div className="grid gap-2">
              <Label htmlFor="name" className='text-white'>Mahsulot nomi</Label>
              <Input id="name" type='text' placeholder='Mahsulot nomini yozing' className='text-white' {...register("name")} />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className='text-white'>Description</Label>
              <Input id="description" type='text' placeholder='Tavsif yozing mahsulot uchun' className='text-white' {...register("description")} />
              {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="count" className='text-white'>Count</Label>
              <Input id="count" type='number' placeholder='Mahsulot soni' className='text-white' {...register("count")} />
              {errors.count && <p className="text-xs text-red-500 font-medium">{errors.count.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label className='text-white'>Status</Label>
              <div className="flex flex-row items-center gap-3 w-full">
                {status.map((item, idx) => (
                  <Button 
                    key={idx} 
                    type="button"
                    variant="ghost"  
                    className={`cursor-pointer flex-1 rounded-full border
                      ${selectedStatus?.toLowerCase() === item.title?.toLowerCase()
                        ? "bg-white text-black border-transparent"
                        : "border-muted-foreground/40 hover:border-muted-foreground text-white" 
                      }`}
                    onClick={() => setSelectedStatus(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price" className='text-white'>Price</Label>
              <Input id="price" type='number' placeholder='Mahsulot narxi' className='text-white' {...register("price")} />
              {errors.price && <p className="text-xs text-red-500 font-medium">{errors.price.message}</p>}
            </div>

          </div>

          <SheetFooter className="pt-4 border-t border-slate-800 ">
            <Button type="submit" className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white" disabled={isSubmitting}>Save changes</Button>
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