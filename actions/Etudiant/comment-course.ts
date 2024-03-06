"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const CommentCourse=async(stars:number,review:string,courseId:string)=>{

    const user=await auth()
    const userId=user?.user.id as string
    console.log("comment"+review)


    const comment=await db.courseReview.create({
        data:{
            courseId:courseId,
            starts:stars,
            userId:userId,
            comment:review
        }
    })
    revalidatePath(`/course/${courseId}`)
   
   

}

export const UpdateComment=async(commentId:string,stars:number,review:string,courseId:string)=>{
    const user=await auth()
    const userId=user?.user.id as string
    console.log("comment"+review)
    const comment=await db.courseReview.updateMany({
        where:{
            courseId:courseId,
            userId:userId,
            id:commentId
        },
        data:{
            starts:stars,
            comment:review
        }
    })
    revalidatePath(`/course/${courseId}`)
   
}
