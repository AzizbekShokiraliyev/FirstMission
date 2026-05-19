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

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>("")

  const handleSort = (type: string) => {
    setSortBy(type)
    console.log("Saralash turi:", type) 
    setIsOpen(false) 
  }
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer bg-slate-800 w-14 h-12 rounded-xl text-white">
            <span><Funnel/></span>
        </Button>
      </DropdownMenuTrigger>  

      <DropdownMenuContent align="start" onClick={() => handleSort("high-to-low")} className={`cursor-pointer w-57 ${sortBy === "high-to-low" ? "bg-slate-100" : ""}`}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter</DropdownMenuLabel>
          <DropdownMenuItem>
            Eng qimmat mahsulotlar
          </DropdownMenuItem>
          <DropdownMenuItem>
            Eng arzon mahsulotlar
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter