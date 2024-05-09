"use server"

import { db } from "@/lib/db"



export async function getCategoryName() {
    const categories = await db.category.findMany({
        select: {
            name: true,
            id: true            
        }
    })
    return categories
}
