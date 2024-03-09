import { auth } from '@/auth';
import { db } from '@/lib/db';
import { create } from 'zustand';





export async function POST(req:Request)
{
    try{

        const user=await auth()
        const userId=user?.user.id as string
        const {chapterId,workUrl,workName}=await req.json()
        const createCompteRendu=await db.report.create({
            data:{
                userId:userId,
                chapterId:chapterId,
                workUrl:workUrl,
               work:workName
            }
        })
        return  Response.json({message:"Work submitted "}, { status: 200 });


    }catch(e)
    {
        return  Response.json({message:"Error submitting work"}, { status: 500 });

    }
}