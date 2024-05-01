"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getMyconversation()
{
   
    const user=await auth()
    const userId=user?.user.id
    const mypurchase=await db.courseUser.findMany({
        where:{
            userId:userId
        },
        select:{
            courseId:true
        }
    })
    const myconversation=await db.conversation.findMany({
        where:{
            courseId:{
                in:mypurchase.map(p=>p.courseId)
            }
            
            
        }
        
    })
    if(!myconversation)
    {
        return []
    }

    return myconversation
}