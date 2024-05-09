import { db } from "@/lib/db"

export const getUserByEmail=async(email:string)=>
{
    try{
        const user=await db.user.findFirst({
            where:{email},
            include:{
                teacherRequest:{
                    select:{
                        status:true,
                        id:true
                    }
                }

            }
        },

        
        

    )
    
        return user



    }catch(e)
    {
        return null
    }

}

export const getUserById=async(id:string)=>
{
    try{
        const user=await db.user.findFirst({
            where:{id},
            include:{
                origin:true
            }
            
        },
       
        
        
        )
        return user
    }catch(e)
    {
        return null
    }

}