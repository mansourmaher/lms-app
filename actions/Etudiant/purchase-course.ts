"use server"

import { db } from "@/lib/db";



export async function purchaseCourse({ courseId, userId }: { courseId: string, userId: string }) {

    const existingPurchase = await db.courseUser.findFirst({
        where: {
            courseId: courseId,
            userId: userId
        }
    })
    if (existingPurchase) {
        return { error: "Course already purchased" }
    }

    
   const purchase= await db.courseUser.create({
        data: {
            courseId: courseId,
            userId: userId
        }
    })
    if(purchase){
       return {success: "Course purchased successfully"}
    }
    return { error: "Error purchasing course" }
}