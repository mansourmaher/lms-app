import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";



export async function POST(req:Request):Promise<void | Response>
{
    try{
        const { courseId, userId } =await  req.json()
       
        const existingPurchase = await db.courseUser.findFirst({
            where: {
                courseId: courseId,
                userId: userId
            }
        })
      
        if (existingPurchase) {
            return  Response.json({message:"Course already purchased"}, { status: 401 });
        }
        
        const purchase= await db.courseUser.create({
            data: {
                courseId: courseId,
                userId: userId
            }
        })
        if(purchase){
            const user= await db.user.findFirst({
                where:{
                    id:userId
                }
            })
            const teacherCourse=await db.course.findFirst({
                where:{
                    id:courseId
                }
            })
           const notification= await db.notifications.create({
                data:{
                    teacher:teacherCourse?.userId!,
                    student:user?.id!,
                    message:`${user?.name} has purchased your course ${teacherCourse?.title}`
                },
                include:{
                    user:true,
                    studentNotif:true
                }
            })
            console.log("sending data to pusher")
             await pusherServer.trigger('notification', 'new-notification', {
                notification
            });
            revalidatePath("/search")
           return  Response.json({message:"Course purchased successfully"}, { status: 200 });
           
        }
        return new Response("Error purchasing course", { status: 500 });
    }catch(e){
        return new Response("Error purchasing course", { status: 500 });
    }
}