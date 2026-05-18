import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce' 
import { setSearchQuery } from '../../../../../store/productSlice' 
import { CardContent } from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const Search = () => {
  const [text, setText] = useState<string>("")
  const [debouncedValue] = useDebounce(text, 300)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue))
  }, [debouncedValue, dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w-full">
      <CardContent className="p-0 flex items-center justify-between">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="w-full max-w-[1200x]">
              <Input
                id="search" 
                type="text" 
                value={text}
                placeholder="Mahsulotlarni qidirish..." 
                onChange={(e) => setText(e.target.value)}
                className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:border-slate-700 rounded-xl h-12 transition-colors"
              />
            </FieldGroup>
          </form>
        </div>
      </CardContent>
    </div>
  )
}

export default Search