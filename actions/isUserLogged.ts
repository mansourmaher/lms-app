import { auth } from "@/auth";

export async function isUserLogged() {

    const user= await auth()
    const isLogged=user?true:false
    return isLogged
}