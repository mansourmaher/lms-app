"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export const markAsComplete = async (chapterId:string) => {

    const user=await auth()
    const userId=user?.user.id as string

    
    const userProgress=await db.userProgress.create({
        data:{
            chapterId:chapterId,
            userId:userId,
            
            isCompleted:true
        }
        })
        
    }