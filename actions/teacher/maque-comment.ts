
"use server"
import { db } from '../../lib/db';


export async function masqueComment(commentId:string){

    await db.courseReview.update({
        where:{
            id:commentId
        },
        data:{
            isMasqued:true
        }
    })
        

}