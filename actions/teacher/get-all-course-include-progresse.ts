"use server"

import { db } from "@/lib/db"
import { getProgress } from "../course/get-progress"
import { auth } from "@/auth";


export async function getAllCourseIncludeProgresse() {
    const courses = await db.course.findMany({});
    const users = await db.user.findMany();

    const progressInCourse = [];
    for (const course of courses) {
        for (const user of users) {
            const progress = await getProgress(user.id, course.id);
            progressInCourse.push({
                ...course,
                user,
                progress
            });
        }
    }

    return progressInCourse;
}


export async function getCourseIncludeProgresse(courseId:string) {

    const userss=await auth()
    const userId=userss?.user.id as string

    const courseIncludeUser=await db.courseUser.findMany({
        where:{
            course:{
                userId:userId,
                isPublished:true,
                id:courseId
      
            },
            
        },
        include:{
            course:{
                include:{
                    chapters:{
                        select:{
                            id:true
                        }

                    }
                }
            },
            
            
            user:true

            
        },
        orderBy:{
            score:"desc"
        }



  
}
    )
    const courseUserIncludeProgress=[]
    for(const course of courseIncludeUser){
        const progress=await getProgress(course?.user?.id!,course.courseId)
        courseUserIncludeProgress.push({
            ...course,
            progress
        })
    }
    const sortedCourseUserIncludeProgressByProgress=courseUserIncludeProgress.sort((a,b)=>b.progress-a.progress)
    return sortedCourseUserIncludeProgressByProgress
}