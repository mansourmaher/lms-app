import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(req:Request,{params}:{params:{chapterId:string,courseId:string}})
{
    const { fileName, fileUrl } = await req.json();
    if(!fileUrl){
        return new NextResponse("No fileUrl send",{status:400})
    }
    
    const user=await auth()
    if(!user)
    {
        return new NextResponse("unhotorized",{status:404})
    }
    const userId=user.user.id
    const chapter=await db.chapter.update({
        where:{
            id:params.chapterId,
            courseId:params.courseId,
        },
        data:{
            toDoName:fileName,
            toDo:fileUrl
        }
    })
    return new NextResponse(JSON.stringify(chapter),{status:200})
}

export async function DELETE(req:Request,{params}:{params:{chapterId:string,courseId:string}})
{
    const user=await auth()
    if(!user)
    {
        return new NextResponse("unhotorized",{status:404})
    }
    const userId=user.user.id
    const chapter=await db.chapter.update({
        where:{
            id:params.chapterId,
            courseId:params.courseId,
        },
        data:{
            toDo:null
        }
    })
    return new NextResponse(JSON.stringify(chapter),{status:200})
}
