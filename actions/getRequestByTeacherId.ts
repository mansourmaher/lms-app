"use server"

import { db } from "@/lib/db";


export const isTeacherHaveRequestPending=async(teacherId:string)=>
{
    const request=await db.teacherRequest.findMany({
        where:{
            userId:teacherId,
            status:"pending"
        }
    })
    return request.length>0
}