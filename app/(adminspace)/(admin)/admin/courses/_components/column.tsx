"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({column})=>{
      return(
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted()==="asc")}>
        title
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>

      )
    },
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "isPublished",
    header: "isPublished",
  },
  
]
