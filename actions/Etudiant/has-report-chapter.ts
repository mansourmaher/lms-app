"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export const  hasReportChapter = async (chapterId:string) => {
    const user=await auth()
    const userId=user?.user.id as string

    const existingReport=await db.report.findFirst({
        where:{
            chapterId:chapterId,
            userId:userId
        }
    })
    if(existingReport){
        return existingReport
    }
    return false
    
    
}