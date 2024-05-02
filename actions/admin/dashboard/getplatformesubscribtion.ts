"use server"

import { db } from "@/lib/db"

export async function getPlatformeSubscibtion()
 {
     
     const courseuser=await db.courseUser.findMany({
        

         
     })
     const totalSubscribtion=courseuser.length
     const date=new Date()
    
     const month=date.getMonth()
     const subscribtionperlastmonth=courseuser.reduce((acc,curr)=>{
         if(curr.createdAt.getMonth()==month-1)
         {
             return acc+1
         }
         return acc
     }
     ,0)
    
     const percentage=(totalSubscribtion-subscribtionperlastmonth)/subscribtionperlastmonth*100
     return {
         totalSubscribtion,
         subscribtionperlastmonth,
         percentage
     }
 }