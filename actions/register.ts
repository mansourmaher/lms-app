import { UserRole } from '@prisma/client';
"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"

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
    
    await db.user.create({data:{email,password:hassedPassword,name,role:role as UserRole}})
    const verificationToken=await generateVerificationToken(email)

    //await sendVerificationEmail(verificationToken.email,verificationToken.token)


    return {succes:"Confirmation Email sent"}

}