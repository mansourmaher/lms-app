"use server"

import { auth } from "@/auth"
import { getTop5PurchasedCoursesByTeacher } from "../dashboard/gettop5coursebyteacher"
import { db } from "@/lib/db"

export async function getthebeststudentinthe5bestcourse()
{
    const user=await auth()
    const userId=user?.user.id
    const courses=await db.course.findMany({
        where:{
             userId:userId,
             courseUser:{
                some:{
                    score:{
                        gte:0
                    }
                    
                    }
             }
        },
        take:7,
           orderBy:{
               totalPurchases:"desc"
           },
           include:{
            courseUser:{
                orderBy:{
                    score:"desc"
                },
                take:1,



            
                
                include:{
                    user:true
                
                }
            }
           }
        
       
       
       
   })
   //console.log(courses)
//    console.log(courses.length)
   const topstudentineachcourse=await Promise.all(courses.map(async (course)=>{
         const topstudent=course.courseUser.sort((a,b)=>b.score!-a.score!).shift()
         return {
                course:course.title,
                name:topstudent?.user?.name!,
                email:topstudent?.user?.email!,
                image:topstudent?.user?.image!,
                score:topstudent?.score
            
         }
    }
    ))
    //   console.log(topstudentineachcourse)
    return topstudentineachcourse

}