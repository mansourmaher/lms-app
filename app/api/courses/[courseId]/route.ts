import { auth } from "@/auth";
import { db } from "@/lib/db";
import { log } from "console";
import { NextResponse } from "next/server";

export async function PATCH(req:Request,{params}:{params:{courseId:string}})

{
    try{
        const user=await auth();
        const userId=user?.user?.id as string;
        const {courseId}=params;
        const values=await req.json();
        const existingcourse=await db.course.findFirst({
            where:{
                id:courseId
            },
            select:{
                id:true,
                title:true,
            }
        })
        console.log("valeus",values);
        if(values.isPublished)
        {
            const existingconversation=await db.conversation.findFirst({
                where:{
                    courseId:courseId
                }
            })
            if(!existingconversation)
            await db.conversation.create({
                data:{
                    title:`${existingcourse?.title} conversation`,
                    courseId:courseId
                    
                }
            })
            
        }
        
        
        if(values.price)
        {
            values.price=parseInt(values.price);
        }

       
        if(!userId)
        {
            throw new Error("You must be signed in to access this route");
        }
        if(!courseId)
        {
            throw new Error("You must provide a course id");
        }
        const course=await db.course.update({
            where:{
                id:courseId
            },
            data:values
        })
        return NextResponse.json(course);
        }
        catch(e)
        {
            return new NextResponse("An error occurred while updating the course");


        

    }
}

export async function  DELETE(req:Request ,{params}:{params:{courseId:string}})
{
    try{
        const user=await auth();
        const userId=user?.user?.id as string;
        const {courseId}=params;
        log(courseId);
        if(!userId)
        {
            throw new Error("You must be signed in to access this route");
        }
        if(!courseId)
        {
            throw new Error("You must provide a course id");
        }
        const course=await db.course.findFirst({
            where:{
                id:courseId
            }
        })
        const deleteChapter=await db.chapter.deleteMany({
            where:{
                courseId:courseId
            }
            
        })
        const deleteAttachment=await db.attachment.deleteMany({
            where:{
                courseId:courseId
            }
            
        })
        
        const deleteCourse=await db.course.delete({
            where:{
                id:courseId
            }
        })
        return new NextResponse("Course deleted successfully");
        }catch(e)
        {
            return new NextResponse("An error occurred while deleting the course");

    }
}


