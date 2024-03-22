"use server"

import { db } from "@/lib/db";
import { Course } from "@prisma/client";



export  async function  getCourseComments(courseId:string ) {
     const comments =await db.courseReview.findMany({
        where: {
        courseId: courseId,
        isMasqued:false
        },
   
    include: {
      user: true,
      
    },

    orderBy: {
      likes: "desc",
    },
  })
  
  return comments;
}