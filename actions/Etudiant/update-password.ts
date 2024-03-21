"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ChangePasswordSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"


export const updatePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
    const validateFields = ChangePasswordSchema.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }
    const { oldPassword, newPassword } = validateFields.data
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}

    }
    const hassedOldPassword=await bcrypt.compare(oldPassword,user.user.password)
    if(!hassedOldPassword)
    {
        return {error:"Invalid old password"}
    }
    const hassedPassword=await bcrypt.hash(newPassword,10)
    const updatePassword=await db.user.update({
        where:{
            id:user.user.id
        },
        data:{
            password:hassedPassword
        }
    })
    if(!updatePassword)
    {
        return {error:"An error occurred"}
    }
    return {success:"Password updated"}
}

