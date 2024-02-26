

import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWidhProgressWidhCategory = Course &{
    category:Category | null
    chapters:{id:string}[]
    progress:number |null
}

type GetCourses={
    userId:string,
    title:string
    category:string

}
export const getCourses=async({
    userId,
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
                    }
                },
                purchases:{
                    where:{
                        userId:userId
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        const coursesWidhProgress:CourseWidhProgressWidhCategory[]=await Promise.all(courses.map(async(course)=>{
            if(course.purchases.length===0){
                return {
                    ...course,
                    progress:null
                }
            }
            const progressPercentage=await getProgress(userId,course.id)
            return {
                ...course,
                progress:progressPercentage
            }
        }
        ))
        return coursesWidhProgress



    }catch(e){
        console.log("get-courses.ts: Error: ",e)
        return []
    }
}
