"use server"
import { db } from '@/lib/db';
import { ProfileSchema } from "@/schemas";
import { z } from "zod";
import { auth } from '@/auth';
import { format } from 'date-fns';

export const FillInformation=async(value:z.infer<typeof ProfileSchema>)=>


{
    console.log("fill information")
    const user=await auth()
    const userId=user?.user.id
    if(!userId)
    {
        console.log("userId eeroor ")
        return {error:"unhotoriezd"}
    }
    console.log(value)

    const validateFiels=ProfileSchema.safeParse(value)
    if(!validateFiels.success)
    {
        console.log("invalid data")
        return {error:"invalid data"}
    }
    const {date,optionSelected,imageUrl,about,country}=validateFiels.data
    // const formatedDate = format(date, 'yyyy-MM-dd');
    //     console.log(formatedDate)
    
    
    const updateUser=await db.user.updateMany({
        where:{
            id:userId
        },
        data:{
            DateOfBirth:date,
            filier:optionSelected,
            origin:country,
            image:imageUrl,


        }
    })
    if(!updateUser)
    {
        console.log("error in updating user")
        return {error:"error in updating user"}
    }
    console.log("user updated")
}