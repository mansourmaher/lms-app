"use server"

import { db } from "@/lib/db";


export async function getCourseUser(userId: string, courseId: string) {
    const courseUser = await db.courseUser.findUnique({
        where: {
        userId_courseId: {
            userId: userId,
            courseId: courseId,
        },
        
        },
        include: {
            course: true,
            user: true,
        },
    });
    return courseUser;
    }