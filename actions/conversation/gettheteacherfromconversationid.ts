"use server"

import { db } from "@/lib/db"



export async function getTheTeacherFromConversationId(conversationId: string)
{
    const conversation=await db.conversation.findUnique({
        where:{
            id:conversationId
        },
        select:{
            courseId:true,
        }
    })
    if(!conversation)
    {
        return null
    }
    const course=await db.course.findUnique({
        where:{
            id:conversation.courseId!
        },
        select:{
            user:true
        }
        }
    
    )
    if(!course)
    {
        return null
    }
    return course.user

}