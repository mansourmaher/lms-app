"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { totalPurchase } from "../course/total-purchase"

type GetCourses={
    
  title:string
  category:string
  teacher:string
  level:string

}


export async function teacherGetMyCourses({
    
  title,
  category,
  teacher,
  level
  
}:GetCourses) {
  const user=await auth()
  const userId=user?.user?.id
  const courses=await db.course.findMany({
    where:{
      
      userId:userId,
      title:{
        contains:title
        
      },
      
     
    },
    include:{
      category:true,
      courseUser:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  
  
   return courses
}