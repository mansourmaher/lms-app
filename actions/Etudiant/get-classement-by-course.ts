"use server"

import { db } from "@/lib/db"


export async function getClassementByCourse(courseId: string) {

    const cuurentClassement=await db.courseUser.count({
        where:{
            courseId:courseId,
            status:"Completed"
        }
    })
    return cuurentClassement

    }

   
