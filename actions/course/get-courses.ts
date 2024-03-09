"use server"
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";

type CourseWidhProgressWidhCategory = Course &{
    category:Category | null
    chapters:{id:string}[]
    review?:{id:string}[]
    avg?:number
    totalReviews?:number

    
}

type GetCourses={
    
    title:string
    category:string

}
export const getCourses=async({
    
    title,
    category,
    
}:GetCourses):Promise<CourseWidhProgressWidhCategory[]>=>{

    try{
       
        const courses=await db.course.findMany({
            where:{
                isPublished:true,
                title:{
                    contains:title
                },
                categoryId:category
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
                review:{
                    select:{
                        id:true
                    }
                },
                
              
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        const courseIncludeAverageRating=await Promise.all(courses.map(async(course)=>{
            const Totalstars=await getFivestarscount(course.id)*5+await getForstarscount(course.id)*4+await getThreestarscount(course.id)*3+await getTwostarscount(course.id)*2+await getOnetarscount(course.id)*1
            const avg=Totalstars/course.review.length
            const totalReviews=course.review.length
            return{
                ...course,
                avg,
                totalReviews

            }

           
        }
        
       
        ))
        return courseIncludeAverageRating



    }catch(e){
        console.log("get-courses.ts: Error: ",e)
        return []
    }
}
