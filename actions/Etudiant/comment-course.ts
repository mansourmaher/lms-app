import { get } from 'http';
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const CommentCourse=async(stars:number,review:string,courseId:string)=>{

    const user=await auth()
    const userId=user?.user.id as string
    const existingcomment=await db.courseReview.findFirst({
        where:{
            courseId:courseId,
            userId:userId
        }
    })
    if(existingcomment){
        return "You already commented this course"
    }
    


    const comment=await db.courseReview.create({
        data:{
            courseId:courseId,
            starts:stars,
            userId:userId,
            comment:review
        }
    })
    const upgradeStars=await db.course.update({
        where:{
            id:courseId
        },
        data:{
            totalStars:{
                increment:stars
            },
            totalReviews:{
                increment:1
            }
        }
    })
    revalidatePath(`/course/${courseId}`)
   
   

}

export const UpdateComment=async(commentId:string,stars:number,review:string,courseId:string)=>{
    const user=await auth()
    const userId=user?.user.id as string
    console.log("comment"+review)

    const getComment=await db.courseReview.findUnique({
        where:{
            courseId:courseId,
            userId:userId,
            id:commentId
        }
    })
    const oldStars=getComment?.starts as number
    

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
    const updateCourseStars=await db.course.update({
        where:{
            id:courseId
        },
        data:{
            totalStars:{
                increment:stars-oldStars
            }
        }
    })
    revalidatePath(`/course/${courseId}`)
   
}
