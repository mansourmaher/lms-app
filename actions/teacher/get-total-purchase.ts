"use server"



import { db } from "@/lib/db"


export async function getTotalPurchaseByteacherId(teacherId: string) {

    const totla=await db.courseUser.count({
        where:{
            course:{
                userId:teacherId
            }
        }
    })
    return totla
   
    
    }