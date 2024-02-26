"use server"

import { sendPasswordResetEmail } from '@/lib/mail';
import { PasswordResetToken } from './../node_modules/.prisma/client/index.d';


import { db } from "@/lib/db"
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from "@/schemas"
import { z } from "zod"


export const Reset=async(values:z.infer<typeof ResetSchema>)=>{
   const validatedFields=ResetSchema.safeParse(values)
    if(!validatedFields.success){
         return {error:validatedFields.error.errors[0].message}
    }

    const {email}=validatedFields.data

    const existingUser=await db.user.findUnique({
        where:{
            email
        }
    })
    if(!existingUser){
        return {error:"No user with this email"}
    }

    const PasswordResetToken=await generatePasswordResetToken(email)
    await sendPasswordResetEmail(PasswordResetToken.email,PasswordResetToken.token)

    return {succes:"Email sent"}

}