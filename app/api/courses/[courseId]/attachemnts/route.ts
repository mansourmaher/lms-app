 import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/auth";


export async function POST(req:Request,{params}:{params:{courseId:string}})

{
    try{
        const user =await auth();
        const userId=user?.user?.id as string;
        const {url}=await req.json()

        if(!url){
            return new NextResponse("URL is required",{status:400})
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const course=await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId

            }
        })
        if(!course){
            return new NextResponse("Unauthorized",{status:401})
        }
        const attachement=await db.attachment.create({
            data:{
                url,
                name:url.split("/").pop(),
                courseId:params.courseId,
                chapterId:params.courseId
               
            }
        })
        return  NextResponse.json(attachement)



    }catch(e){
        console.log(e)
        return new NextResponse("Internal Server Error",{status:500})

    }

}