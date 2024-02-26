"use server"

import { db } from "@/lib/db"



export async function getCourseById(courseId: string, userId: string) {
    const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
    
        include: {
          review: true,
          user:true,
          category: true,
          
            
            
           
           
          },
        },
      );
        return course
}