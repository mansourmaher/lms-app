"use server"

import { db } from "@/lib/db"


export async function totalPurchase(courseId:string):Promise<number>
{
    const totalPurchase = await db.courseUser.count({
        where: {
            courseId: courseId,
        }
    })
    return totalPurchase
}