"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function isuserpurchasedthecourseconversationId(convId:string)
{
    const user=await auth()
    const userId=user?.user.id
    const conv=await db.conversation.findUnique({
        where:{
            id:convId
        },
        select:{
            courseId:true
        }
    }
)
    const existingpurchase=await db.courseUser.findUnique({
        where:{
            userId_courseId:{
                userId:userId!,
                courseId:conv?.courseId! as string
                
                

            }
        }
    })
    if(existingpurchase)
    {
        return true
    }
    else
    {
        return false
    }

}