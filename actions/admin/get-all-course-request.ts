"use server"

import { db } from "@/lib/db"

export async function getAllCourseRequest()
{
    const courses=await db.course.findMany({
        where:{
            status:"pending",
            isPublished:true
        },
        select:{
            id:true,
            user:true,
            createdAt:true,
            title:true,
            chapters:{
                select:{
                    id:true,
                    title:true,
                }
            },
            category:{
                select:{
                    name:true
                }
            }
        }
    })
   
    return courses
}