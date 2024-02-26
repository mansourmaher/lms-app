"use server"

import { db } from "@/lib/db";
import { Course } from "@prisma/client";



export  async function  getCourseComments(course:Course | null) {
    return await db.courseReview.findMany({
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
}