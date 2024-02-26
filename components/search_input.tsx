"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import qs from "query-string"



export const SearchInput = () => {
    const [value,setValue] = useState("")
    const debouncedValue = useDebounce(value)
    const searchParams=useSearchParams()
    const router=useRouter()
    const pathname=usePathname()
    const currentCategory = searchParams.get("category");

    useEffect(()=>{
        const url=qs.stringifyUrl({
            url:pathname,
            query:{
                title:debouncedValue,
                category:currentCategory
            }
        }
        ,{skipEmptyString:true,skipNull:true}
        )
        router.push(url)
    }
    ,[debouncedValue,currentCategory,pathname,router])




    return(
        <div className="relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-500" />
            <Input className="w-full md:w[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 "
            placeholder="Search for courses"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            />
        </div>
    )
}