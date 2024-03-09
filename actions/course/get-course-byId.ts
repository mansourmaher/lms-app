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
          
            
            
           
           
          },
        },
      );
      const Totalstars=await getFivestarscount(course!.id)*5+await getForstarscount(course!.id)*4+await getThreestarscount(course!.id)*3+await getTwostarscount(course!.id)*2+await getOnetarscount(course!.id)*1
            const avg=Totalstars/course!.review.length
            const totalReviews=course!.review.length
            return {...course,avg,totalReviews}
       
}




