"use server"
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWidhProgressWidhCategory = Course &{
    category:Category | null
    chapters:{id:string}[]
    
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
                    }
                }
              
            },
            orderBy:{
                createdAt:"desc"
            }
        })
       
        return courses



    }catch(e){
        console.log("get-courses.ts: Error: ",e)
        return []
    }
}
