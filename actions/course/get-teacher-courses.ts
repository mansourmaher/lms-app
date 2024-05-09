"use server"
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";
import { getCourseRating } from "./get-course-rating";

type CourseWidhProgressWidhCategory = Course &{
    category:Category | null
    chapters:{id:string}[]
    review?:{id:string}[]
    

    
}


export const getCoursesBytecaher=async(tecaherId:string):Promise<CourseWidhProgressWidhCategory[]>=>{

    try{
       
       
        const courses=await db.course.findMany({
            where:{
                isPublished:true,
                userId:tecaherId,
                status:"verified"
            },
            include:{
               
                category:true,
                chapters:{
                    where:{
                        isPublished:true
                    },
                    
                    select:{
                        id:true
                    },
                    
                },
                
                
              
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        // const courseIncludeAverageRating=await Promise.all(courses.map(async(course)=>{
        //     const avg=await getCourseRating(course.id)
        //     const totalReviews=course.review.length
        //     return{
        //         ...course,
        //         avg,
        //         totalReviews

        //     }

           
        // }
        
       
        // ))
        // return courseIncludeAverageRating
       
        return courses




    }catch(e){
        console.log("get-courses.ts: Error: ",e)
        return []
    }
}
