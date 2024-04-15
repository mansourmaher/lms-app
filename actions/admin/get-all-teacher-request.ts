import { use } from 'react';
"use server"

import { db } from "@/lib/db"


export  async function getAllTeacherRequest()
{
    return await db.teacherRequest.findMany({
        include: {
            user: true

    }
    })
}