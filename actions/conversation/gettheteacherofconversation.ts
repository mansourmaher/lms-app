"use server"

import { db } from "@/lib/db"


export async function getTheteacheroftheconversation(convId:string)
{
    const conv=await db.conversation.findFirst({
        where:{
            id:convId
        },
        select:{
            courseId:true
        }
    })
    if(!conv)
        {
            return null
        
        }
    const teacher=await db.course.findFirst({
        where:{
            id:conv!.courseId!
        },
        select:{
            user:true,
            id:true
        }
    })
    if(!teacher)
        {
            return null
        }
    return teacher

}
