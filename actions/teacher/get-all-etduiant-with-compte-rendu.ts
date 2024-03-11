"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getAllEtudiantWithCompteRendu() {
  
    try{
        const user=await auth()
        const teacherId=user?.user?.id

        const compterendu=await db.report.findMany({
            where:{
                course:{
                    userId:teacherId
                    
                }
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                        image:true
                    }
                },
                
                course:{
                    select:{
                        id:true,
                        title:true,
                        createdAt:true
                    }
                },
                
                
                chapter:{
                    select:{
                        id:true,
                        title:true
                    }
                }
                
                
            
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return compterendu
    }catch(e){
        return e
    }
}