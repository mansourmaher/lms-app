import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";



export async function POST(req:NextRequest)
{
    try{
        const {isLikes,comment,courseId} = await req.json()
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
            
            return Response.json({success:true})
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

        
        return Response.json({success:true})
    }catch(e:any){
        return Response.json({error:e.message})
    }
}