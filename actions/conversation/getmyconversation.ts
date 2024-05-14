import { use } from 'react';
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getMyconversation()
{
   
    const user=await auth()
    const userId=user?.user.id
    const mypurchase=await db.courseUser.findMany({
        where:{
            userId:userId,
            course:{
                isPublished:true,
                status:"verified"
            }
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