"use server"

import { db } from "@/lib/db";


export async function getChapterCount(courseId:string) {
    const chapters = await db.chapter.findMany({
        where:{
            courseId:courseId
        }
    });
    return chapters.length;
}