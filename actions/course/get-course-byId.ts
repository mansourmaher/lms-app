"use server"

import { db } from "@/lib/db"
import { getFivestarscount, getForstarscount, getOnetarscount, getThreestarscount, getTwostarscount } from "./get-stars-number";



export async function getCourseById(courseId: string, userId: string) {
    const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
    
        include: {
          review: true,
          user:true,
          category: true,
          chapters: {
            select: {
              id:true
            }
          },
          
            
            
           
           
          },
        },
      );
      const avg=course?.totalStars!/course?.totalReviews!
      const totalReviews=course?.totalReviews
            return {...course,avg,totalReviews}
       
}




