"use server"

import { db } from "@/lib/db"



export async function handeldeletequiz(id:string) {

    await db.options.deleteMany({
        where: {
            quizId: id
        }
    });
    await db.quiz.delete({
        where: {
            id: id
        }
    })
    

    
  
  
}