"use server"

import { db } from "@/lib/db"
export async function platformetotalpublishedcourseincludeincrease() {
    const totlacourseinthismonth = await db.course.count(
      {
        where: {
            status: "verified",
         
            
          },
        
      },
    );
  
    const tottalcourseinlastmonth = await db.course.count(
      {
        where: {
            status: "verified",

         
            
          
        },
      },
    );
  
    return {
      total: totlacourseinthismonth,
      increase:
        totlacourseinthismonth - tottalcourseinlastmonth,
    };
  }