"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getPercentageOfPlusque3StarsByteacher() {
    const user=await auth()
    const teacherId=user?.user?.id

    const plusque3stars=await db.courseReview.findMany({
        
        where:{
            course:{
                userId:teacherId,
                isPublished:true
            },
        
           starts:{
                gte:3
              }
        }
    })
    const total=await db.courseReview.findMany({
        
        where:{
            course:{
                userId:teacherId,
                isPublished:true
            }
        }
    })
    const percentage=(plusque3stars.length/total.length)*100
    return percentage

  
}