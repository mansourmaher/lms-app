"use server"

import { db } from "@/lib/db"


export async function getTeacherWithCoursesCount() {
   const teachers=await db.course.findMany({
         select:{
              user:true
         },
         distinct:["userId"]
    })
    const teachersWithCoursesCount=await Promise.all(teachers.map(async teacher=>{
        const coursesCount=await db.course.count({
            where:{
                userId:teacher.user?.id 
            }
        })
        return {
            ...teacher,
            coursesCount 
        }
    }
    ))
    return teachersWithCoursesCount

}

