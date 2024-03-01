"use server"

import { db } from "@/lib/db"


export async function teacherGetMyCourses() {
  const courses=await db.course.findMany({
    where:{
      isPublished:true,
     
    }
  })
    return courses
}