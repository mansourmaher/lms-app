"use server"

import { db } from "@/lib/db";
import { Course } from "@prisma/client";



export  async function  getCourseComments(course:Course | null) {
     const comments =await db.courseReview.findMany({
        where: {
        courseId: course?.id,
        },
   
    include: {
      user: true,
      
    },

    orderBy: {
      createdAt: "asc",
    },
  })
  
  return comments;
}