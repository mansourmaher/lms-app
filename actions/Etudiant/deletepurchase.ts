"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function deletepurchase(id:string)
{
    const user=await auth()
    const userId=user?.user.id

    await db.courseUser.delete({
        where:{
            userId_courseId:{
                userId:userId as string,
                courseId:id
            }
        }
    })
  
}