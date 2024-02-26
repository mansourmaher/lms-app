"use server"


import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification=async(token:string)=>
{
    const existingToken=await getVerificationTokenByToken(token)
    if(!existingToken)
    {
        return {error:"Invalid token"}
    }
    const hasExpired=new Date(existingToken.expires)<new Date()
    if(hasExpired)
    {
        return {error:"Token has expired"}
    }
    const exitingUser=await getUserByEmail(existingToken.email)
    if(!exitingUser)
    {
        return {error:"User does not exist"}
    }

    await db.user.update({
        where:{
            id:exitingUser.id
        },data:{
            emailVerified:new Date(),
            email:existingToken.email

        }
    })
    await db.verificationToken.delete({
        where:{
            id:existingToken.id
        }
    })
    return {success:"Email verified"}
}
