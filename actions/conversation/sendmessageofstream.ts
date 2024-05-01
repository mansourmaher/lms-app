"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function sendMessageofthestream(courseId:string,url:string)
{
    const user=await auth()
    const userId=user?.user.id
    const conversation=await db.conversation.findFirst({
        where:{
            courseId:courseId
        
        }
    })
    if(!conversation)
    {
        const newconversation=await db.conversation.create({
            data:{
                courseId:courseId,
                
            }
        })
    }
    const message=await db.message.create({
        data:{
            senderId:userId!,
            conversationId:conversation!.id,
            body:url
        }
    })
    return message
}