"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function getPlatformeUnPublisedcourse()
 {
     
     const course=await db.course.findMany({
         where:{
            
             isPublished:true,
             status:"pending"
         }
     })
     return course.length
 }