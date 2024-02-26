import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"




export async function POST(req:Request,{params}:{params:{courseId:string}})
{
    try{
        const user=await auth()
        const userId=user?.user.id
        if(!userId)
        {
            return new NextResponse("unauthorized", {status: 401})
        }
        const courseId=params.courseId
        if(!courseId)
        {
            return new NextResponse("courseId is required", {status: 400})
        }
        const course=await db.course.findUnique({
            where:{
                id:courseId
            }
        })
        if(!course)
        {
            return new NextResponse("course not found", {status: 404})
        }
        const lastChapter=await db.chapter.findFirst({
            where:{
                courseId:courseId
            },
            orderBy:{
                position:"desc"
            }
        })
        const {title}=await req.json()
       
        const order=lastChapter?lastChapter.position+1:1
        const chapter=await db.chapter.create({
            data:{
                title:title,

                position:order,
                courseId:params.courseId,
               
            }
        })
        return new NextResponse("chapter added", {status: 200})


    }catch(e){
        console.log(e)
        
        return new NextResponse("error while adding chapter", {status: 500})

    }
}