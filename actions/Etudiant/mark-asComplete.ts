"use server"

import { db } from "@/lib/db"



export const markAsComplete = async (chapterId:string,userId:string) => {

    
    const userProgress=await db.userProgress.create({
        data:{
            chapterId:chapterId,
            userId:userId,
            
            isCompleted:true
        }
        })
        
    }