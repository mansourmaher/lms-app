"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"



export async function ReactOnComment(isLikes: boolean,comment:string,courseId:string) {

    
  
    const realComment = await db.courseReview.findUnique({
        where: {
            id: comment
        }
    })
    
    
    if(isLikes){
        const likes = realComment?.likes
          await db.courseReview.update({
            where: {
                id: comment
            },
            data: {
                likes: likes! + 1
            }
        })
        revalidatePath(`/course/${courseId}`)
        
        return 
    
    }
    
    const dislikes = realComment?.dislikes
      await db.courseReview.update({
        where: {
            id: comment
        },
        data: {
            dislikes: dislikes! + 1
        }
    })
    revalidatePath(`/course/${courseId}`)
    
    return
    

}