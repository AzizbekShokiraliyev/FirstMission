import { Button } from '@/components/ui/button'
import { Funnel } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { setSortBy } from '@/store/productSlice'

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const sortBy = useSelector((state: RootState) => state.product.sortBy)

  const handleSort = (type: string) => {
    dispatch(setSortBy(type)) 
    setIsOpen(false) 
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer bg-slate-800 w-14 h-12 rounded-xl text-white">
            <span><Funnel/></span>
        </Button>
      </DropdownMenuTrigger>  

      <DropdownMenuContent align="start" className={`cursor-pointer w-57 ${sortBy === "high-to-low" ? "bg-slate-100" : ""}`}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleSort("high-to-low")} >
            Eng qimmat mahsulotlar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("low-to-high")}>
            Eng arzon mahsulotlar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter