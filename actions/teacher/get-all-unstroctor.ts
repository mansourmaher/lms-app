"use server"

import { db } from "@/lib/db";
import { getTeacherRating } from "./get-teacher-rating";
import { getCoursesCountByTeacher, getTeacherReviewCount } from "../course/get-courses-count-by-teacher";
import { getTotalPurchaseByteacherId } from "./get-total-purchase";




export async function getAllUnstroctor(name:string | null){

    const teachers=await db.course.findMany({
          distinct:["userId"],
        //   where:{
        //     isPublished:true
        //   },
        
        include:{
            user:{
                where:{
                    name:{
                        contains:name||""
                    }
                },
                select:{
                    name:true,
                    id:true,
                    image:true,
                    subtitle:true
                }
            },
            review:true
            
        }
    })
    const filterdTeacher = teachers.filter((teacher) => teacher.user !== null);
    
    const teachersWithAvg=await Promise.all(filterdTeacher.map(async teacher=>{
        const avg=await getTeacherRating(teacher.userId)
        const totalReviews=await getTeacherReviewCount(teacher.userId)
        const totlacourse=await getCoursesCountByTeacher(teacher.userId)
        const totlaPurchase=await getTotalPurchaseByteacherId(teacher.userId)

        
        return {...teacher,avg,totalReviews,totlacourse,totlaPurchase}
    })
    )
    const sortedTeachers=teachersWithAvg.sort((a,b)=>b.avg-a.avg)
    return sortedTeachers
    
   
    
    
}
    