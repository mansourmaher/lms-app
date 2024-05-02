"use server"

import { auth } from "@/auth"
import { getMyconversation } from "./getmyconversation"



export async function getTheFirstConversation() {
    const user=await auth()
    const userId=user?.user.id
    const conv=await getMyconversation()
    const firstconv=conv[0]
    return firstconv

}