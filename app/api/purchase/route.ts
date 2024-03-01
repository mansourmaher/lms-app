import { db } from "@/lib/db";
import { NextRequest } from "next/server";



export async function POST(req:Request):Promise<void | Response>
{
    try{
        const { courseId, userId } =await  req.json()
        console.log("courseId",courseId)
        console.log("userId",userId)
        const existingPurchase = await db.courseUser.findFirst({
            where: {
                courseId: courseId,
                userId: userId
            }
        })
        console.log("asbaa1")
        if (existingPurchase) {
            return  Response.json({message:"Course already purchased"}, { status: 401 });
        }
        console.log("asbaa2")
        const purchase= await db.courseUser.create({
            data: {
                courseId: courseId,
                userId: userId
            }
        })
        if(purchase){
           return new Response("Course purchased successfully", { status: 200 });
        }
        return new Response("Error purchasing course", { status: 500 });
    }catch(e){
        return new Response("Error purchasing course", { status: 500 });
    }
}