import { create } from 'zustand';
import { statuses } from './../../app/(dashboard)/(routes)/teacher/courses/_components/table-user/data/data';
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getProgress } from '../course/get-progress';
import { pusherServer } from '@/lib/pusher';



export const markAsComplete = async (chapterId:string,courseId:string) => {

    const user=await auth()
    const userId=user?.user.id as string

    
    const userProgress=await db.userProgress.create({
        data:{
            chapterId:chapterId,
            userId:userId,
            
            isCompleted:true
        }
        })

        const userProgression=await getProgress(userId,courseId)
        console.log("userProgression",userProgression)

        if (userProgression===100)
{

         const updatedCourseUser=await db.courseUser.update({
             where:{
                 userId_courseId:{
                     courseId:courseId,
                     userId:userId
                 }
             },
             data:{
                 status:"Completed"
             }
         })
         const course=await db.course.findFirst({
                where:{
                    id:courseId
                }
            })
         const notification=await db.notifications.create({
                data:{
                    teacher:course?.userId!,
                    student:userId,
                    message:`${user?.user.name} has completed the course`
                },
                include:{
                    user:true,
                    studentNotif:true
                }
            })
            await pusherServer.trigger('notification', 'new-notification', {
                notification
            });

            


        }
        else{

        
            const updatedCourseUser=await db.courseUser.update({
                where:{
                    userId_courseId:{
                        courseId:courseId,
                        userId:userId
                    }
                },
                data:{
                    status:"In progress"
                }
            })
    }
        
    }