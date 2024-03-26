"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { totalPurchase } from "../course/total-purchase"


export async function teacherGetMyCourses() {
  const user=await auth()
  const userId=user?.user?.id
  const courses=await db.course.findMany({
    where:{
      isPublished:true,
      userId:userId
     
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