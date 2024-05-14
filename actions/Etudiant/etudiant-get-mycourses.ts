"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getProgress } from "../course/get-progress"


export async function etudiantgetycourses()
{
    const user=await auth()
    const userId=user?.user.id
    const courses=await db.courseUser.findMany({
        where:{
            course:{
                isPublished:true,
                status:"verified"
            },
            user:{
                id:userId
            }
            
        },
        include:{
            course:{
                select:{
                    id:true,
                    title:true,
                    description:true,
                    chapters:true,
                    imageUrl:true
                }
            }
               
              
        }
    })
    const coursesIncludeProgresse=await Promise.all(courses.map(async(course)=>{
        const progress=await getProgress(userId!,course.courseId)
        return {
            ...course,
            progress
        }
    }
    ))
    
    return coursesIncludeProgresse
}