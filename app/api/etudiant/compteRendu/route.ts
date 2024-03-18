import { auth } from '@/auth';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { create } from 'zustand';





export async function POST(req:Request)
{
    try{

        const user=await auth()
        const userId=user?.user.id as string
        const {chapterId,workUrl,workName,courseId}=await req.json()
        const createCompteRendu=await db.report.create({
            data:{
                courseId:courseId,
                userId:userId,
                chapterId:chapterId,
                workUrl:workUrl,
               work:workName
            }
        })
        const course=await db.course.findUnique({
            where:{
                id:courseId
            },
            select:{
                userId:true,
                title:true
            }
        })
        const chapter=await db.chapter.findUnique({
            where:{
                id:chapterId
            },select:{
                title:true
            }
        })
        const notification= await db.notifications.create({
            data:{
                teacher:course?.userId!,
                student:userId,
                message:`${user?.user.name} has submitted work for ${course?.title} for the chapter ${chapter?.title}`
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
        return  Response.json({message:"Work submitted "}, { status: 200 });


    }catch(e)
    {
        return  Response.json({message:"Error submitting work"}, { status: 500 });

    }
}