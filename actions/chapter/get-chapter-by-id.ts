"use server"

import { db } from "@/lib/db"


export async function getChapterById(chapterId: string) {
    const chapter = await db.chapter.findFirst({
        where: {
          id: chapterId,
        },
        include: {
          course: true,
          resources:true
          
        },
      });
        return chapter
    }   

