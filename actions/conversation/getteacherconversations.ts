"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getTeacherConversations()
{
    {
   
        const user=await auth()
        const userId=user?.user.id
        const mycourses=await db.course.findMany({
            where:{
                userId:userId,
                isPublished:true,
                status:"verified"
                
               
                

            },
            select:{
                id:true
            }
        })
        const myconversation=await db.conversation.findMany({
            where:{
                courseId:{
                    in:mycourses.map(p=>p.id)
                }
                
                
            },
            include:{
                course:{
                    select:{
                        title:true,
                        imageUrl:true
                    }
                },
                messages:{
                    select:{
                        body:true,
                        createdAt:true,
                        sender:{
                            select:{
                                name:true
                        }
                    },
                    
                    },
                    orderBy:{
                        createdAt:"desc"
                    },
                    take:1
                },
            }
            
        })
        if(!myconversation)
        {
            return []
        }
    
        return myconversation
    }
}