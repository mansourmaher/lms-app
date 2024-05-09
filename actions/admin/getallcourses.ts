"use server"

import { db } from "@/lib/db"

export async function getAllCourses() {
    const courses=await db.course.findMany({
        where:{
            isPublished:true,
            status:{
               notIn:["rejected","pending"]
            }
        },
        include:{
            user:true,
            category:{
                select:{
                    id:true,
                    name:true
                
                }
            },
            chapters:{
                select:{
                    id:true,
                }
            }
        }
    }
)
    return courses
}