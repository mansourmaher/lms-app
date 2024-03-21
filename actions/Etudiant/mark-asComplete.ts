import { create } from 'zustand';
import { statuses } from './../../app/(dashboard)/(routes)/teacher/courses/_components/table-user/data/data';
"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getProgress } from '../course/get-progress';
import { pusherServer } from '@/lib/pusher';
import { get } from 'http';
import { getClassementByCourse } from './get-classement-by-course';



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

    const lastClassement=await getClassementByCourse(courseId)
    let points=0;
    lastClassement===0?points=20:lastClassement===1?points=15:lastClassement===2?points=10:points=5
    const updateUser=await db.user.update({
        where:{
            id:userId
        },
        data:{
            points:points
        }
    })
    

         const updatedCourseUser=await db.courseUser.update({
             where:{
                 userId_courseId:{
                     courseId:courseId,
                     userId:userId
                 }
             },
             data:{
                 status:"Completed",
                 classement:lastClassement+1
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