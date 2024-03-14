"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"



export async function removeReportChapter(reportId:string) {
    try {
        await db.report.delete({
            where:{
                id:reportId
            }
        })
        

    }catch(e){
        return e
    }
}
