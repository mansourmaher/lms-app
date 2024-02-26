"use server"
import { db } from "@/lib/db"


export const getProgress=async(
    userId:string,
    courseId:string | undefined
):Promise<number>=>{
    try{
        const publicChpater=await db.chapter.findMany({
            where:{
                courseId:courseId,
                isPublished:true
            },
            select:{
                id:true
            }
        })

        const publicChpaterIds=publicChpater.map((chapter)=>chapter.id)

        const validCompleteChapter=await db.userProgress.count({
            where:{
                userId:userId,
                chapterId:{
                    in:publicChpaterIds
                },
                isCompleted:true
            }

        })
        const progressPercentage=(validCompleteChapter/publicChpaterIds.length)*100
        return progressPercentage


    }catch(e){
        throw e
    }
}