"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export async function getAllNotifications() {
    const user=await auth()
    const notifiedUserId=user?.user.id as string
    const notifications=await db.notifications.findMany({
        where:{
            teacher:notifiedUserId,
            
        },
        include:{
            studentNotif:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return notifications
}