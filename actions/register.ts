import { UserRole } from '@prisma/client';
"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"
import { url } from 'inspector';

export const register=async(values:z.infer<typeof RegisterSchema>)=>
{
    
    const validateFiels=RegisterSchema.safeParse(values)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const {email,password,name,role}=validateFiels.data
    const hassedPassword=await bcrypt.hash(password,10)
    const existUser=await getUserByEmail(email)
    if(existUser)
    {
        return {error:"Email already exist"}
    }
    
    const newUser=await db.user.create({data:{email,password:hassedPassword,name,role:role as UserRole}})
    const verificationToken=await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email,verificationToken.token)

    if(newUser.role==="TEACHER" && !values.url && !values.filename)
    {
        return {error:"Please provide a url and filename"}
    }
    if(newUser.role==="TEACHER")
        {

        

   const requestt= await db.teacherRequest.create({
        data:{
            userId:newUser.id,
            url:values.url!,
            title:values.filename!
        }
    })
    return {succes:"Grate you have been registered as a teacher Now lets wait for the admin to accept your request"}
    
}
    


    return {succes:"Wellcome to ower platform verify your email to start"}

}