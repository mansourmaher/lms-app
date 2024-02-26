"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"



export async function ReactOnComment(isLikes: boolean,comment:string) {

    console.log("reacting on comment")
  
    const realComment = await db.courseReview.findUnique({
        where: {
            id: comment
        }
    })
    const likes = realComment?.likes
    console.log("liking")
    if(isLikes){
         return await db.courseReview.update({
            where: {
                id: comment
            },
            data: {
                likes: likes! + 1
            }
        })
    
    }
    console.log("disliking")
    const dislikes = realComment?.dislikes
    return  await db.courseReview.update({
        where: {
            id: comment
        },
        data: {
            dislikes: dislikes! + 1
        }
    })
    

}