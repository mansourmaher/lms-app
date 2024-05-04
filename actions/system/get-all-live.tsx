"use server"

import { db } from "@/lib/db"



export async function getAllMeetings()
{
    return await db.meeting.findMany({
        where:{
            status:"active"
        }
    })
}