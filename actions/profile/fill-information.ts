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
        console.log("country"+value.country)
        return {error:"invalid data"}
    }
    const {date,optionSelected,imageUrl,about,country,subtitle,patients}=validateFiels.data

    const existingOrigin=await db.origin.findFirst({
        where:{
            userId:userId
        }
    })
    if(existingOrigin)
    {
        await db.origin.updateMany({
            where:{
                userId:userId
            },
            data:{
                label:country?.label,
                value:country?.value,
                flag:country?.flag,
                region:country?.region,
                lalng:country?.lalng
            }
        })
       
        
      
        
        
    }
    else
    {
        await db.origin.create({
            data:{

                label:country?.label!,
                value:country?.value!,
                flag:country?.flag!,
                region:country?.region!,
                lalng:country?.lalng!,
                userId:userId
            }
        })
    }

    
  
    
    const updateUser=await db.user.updateMany({
        where:{
            id:userId
        },
        data:{
            DateOfBirth:date,
            filier:optionSelected,
            
            image:imageUrl,
            about:about,
            patiants:patients,
            subtitle:subtitle


        }
    })
    if(!updateUser)
    {
        console.log("error updating user")
        return {error:"error updating user"}
    }
    
    return {success:true}
    
}