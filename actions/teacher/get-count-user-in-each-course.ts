"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";



export async function getCountUserInEachCourse(teacherId:string) {

    
  
    const coursesPurchases=await db.courseUser.count({
        where: {
            course:{
                userId: teacherId
            }
            
        }
    })
    return coursesPurchases;
   

}