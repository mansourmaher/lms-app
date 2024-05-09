"use server"

import { db } from "@/lib/db"



export async function blockEcourse(courseId:string) {
    return await db.course.update({
        where: {
            id: courseId
        },
        data: {
            status: "blocked"
        }
    })
}