import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(req:Request,{params}:{params:{chapterId:string,courseId:string}})
{
    const data=await req.json()
    if(!data){
        return new NextResponse("No data send",{status:400})
    }
    console.log("data .todo"+data.toDo)
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
            toDo:data.toDo
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
