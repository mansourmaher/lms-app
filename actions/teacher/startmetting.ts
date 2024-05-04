"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"




export async function startMeeting(title:string,desscreption:string)
{
    const user=await auth()
    const userId=user?.user.id

    const meet= await db.meeting.create({
        data:{
            title:title,
            description:desscreption,
            userId:userId!,
            link:""
        }
    })
    return meet

}