"use server"

import { auth } from "@/auth"
import { getMyconversation } from "./getmyconversation"
import { getTeacherConversations } from "./getteacherconversations"



export async function getteacherfirstconversation() {
    const user=await auth()
    const userId=user?.user.id
    const conv=await getTeacherConversations()
    const firstconv=conv[0]
    return firstconv

}