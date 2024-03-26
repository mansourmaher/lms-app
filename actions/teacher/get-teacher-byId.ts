"use server"

import { db } from "@/lib/db"
import { getTeacherRating } from "./get-teacher-rating";


export async function getTeacherById(teacherId: string) {
  const teacher= await db.user.findUnique({
    where: {
      id: teacherId,
    },
    include: {
        origin: true,
        
    }
  });
  const totalTecaherPurchase=await db.courseUser.count({
    where:{
      course:{
        userId:teacherId
      }
    }
  })
  const totlaCourse=await db.course.count({
    where:{
      userId:teacherId
    }
  })
  const avgReview=await getTeacherRating(teacherId)
  const totalReview=await db.courseReview.count({
    where:{
      course:{
        userId:teacherId
      }
    }
  })
  const reviews=await db.courseReview.findMany({
    where:{
      course:{
        userId:teacherId
      }
    },
    include:{
      user:true,
      course:true
    
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return {
    ...teacher,
    totalTecaherPurchase,
    totlaCourse,
    avgReview,
    totalReview,
    reviews
  }
  
}