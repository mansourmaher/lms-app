"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";


export async function existingPurchase(courseId:string):Promise<boolean>
{
    try{
        const user=await auth();
        const userId=user?.user.id as string;
        const existingPurchase = await db.courseUser.findFirst({
            where: {
                courseId: courseId,
                userId: userId
            }
        })
        if(existingPurchase){
            return true
        }
        return false
    }catch(e){
        return false
    }
}