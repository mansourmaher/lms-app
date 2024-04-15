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
                    status:"Validated"
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

export const RemoveRequest=async(id:string)=>{
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
                        status:"rejected"
                    }
                })
                await db.user.update({
                    where:{
                        id
                    },
                    data:{
                        teacherAccess:false
                    }
                })
                return {success:"Teacher Access Removed"}
            }
            
        }
        return {error:"Error Occured while granting access to teacher"}
}
    