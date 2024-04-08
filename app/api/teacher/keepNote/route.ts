
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { pusherServer } from '@/lib/pusher';
import { revalidatePath } from 'next/cache';



export async function POST(req:Request)
{
    try{
            
            const user=await auth()
            const userId=user?.user.id as string
            const {reportId,grade,note,initilagrade}=await req.json()
           
            const createCompteRendu=await db.report.update({
            where:{
                id:reportId
            },
            data:{
                grade:grade,
                note:note,
                status:"validated"
            }
                
             })
             
             const existingscore=await db.courseUser.findUnique({
                where:{
                    userId_courseId:{
                        courseId:createCompteRendu.courseId,
                        userId:createCompteRendu.userId
                    }
                    
                },
                select:{
                    score:true
                }
            })
            const scoretoadd=grade-initilagrade
           
             const updatescore=await db.courseUser.update({
                where:{
                    userId_courseId:{
                        courseId:createCompteRendu.courseId,
                        userId:createCompteRendu.userId
                    }
                },
                data:{
                    score:existingscore?.score!+scoretoadd
                }
            }
            )
            
                
             const getStudent=await db.report.findFirst({
                    where:{
                        id:reportId
                    },
                    include:{
                        user:true
                    }
                })
            
             const notification=await db.notifications.create({
                data:{
                    teacher:getStudent?.user?.id!,
                    student:userId,
                    message:`${user?.user.name} has submitted your work`,
                    courseId:getStudent?.courseId,
                    chapterId:getStudent?.chapterId,
                }
            })
            
            await pusherServer.trigger('notification', 'new-notification', {
                notification
            });
            revalidatePath('teacher/check')
            return  Response.json({message:"Work submitted you studnet will be notified"}, { status: 200 });
    }catch(e)
    {
        return  Response.json({message:"Error submitting work"}, { status: 500 });
    }
}