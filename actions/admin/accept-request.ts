"use server"

import { db } from "@/lib/db"



export const AcceptRequest=async(id:string)=>{

    if(id)
    {
        
        const existingTeacher=await db.user.findFirst({
            where:{
                id
            }
        })
        
        if(existingTeacher)
        {
            await db.teacherRequest.updateMany({
                where:{
                    userId:id
                },
                data:{
                    status:"accepted"
                }
            })
            await db.user.update({
                where:{
                    id
                },
                data:{
                    teacherAccess:true
                }
            })
            return {success:"Teacher Access Granted"}
        }
        
    }
    return {error:"Error Occured while granting access to teacher"}

}