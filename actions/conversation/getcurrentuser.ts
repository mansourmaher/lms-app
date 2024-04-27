"use server"
import { auth } from '@/auth';




export async function getCurrentUser() {
    const user = await auth();
    return user;
}