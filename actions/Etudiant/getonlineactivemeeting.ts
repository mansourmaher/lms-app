"use server"

import { db } from "@/lib/db"



export async function getOnlineActiveMeeting()
{
    
    const meet= await db.meeting.findMany({
        where:{
            status:"active"
        }
    })
    return meet
}