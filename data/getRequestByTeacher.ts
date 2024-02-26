"use server"

import { db } from "@/lib/db";


export const isTeacherHaveRequestPending=async(teacherId:string)=>
{
    const request=await db.teacherRequest.findMany({
        where:{
            userId:teacherId,
            status:"PENDING"
        }
    })
    return request.length>0
}