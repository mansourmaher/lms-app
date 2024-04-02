import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import next from "next";
import { NextResponse } from "next/server";

type CourseWidhProgressWidhCategory = Course &{
  category:Category | null
  chapters:{id:string}[]
  review?:{id:string}[]
  avg?:number
  totalReviews?:number
}
type GetCourses={
    
  title:string
  category:string
}

export async function GET(){
  try {
    console.log("get courses");
    const courses=await db.course.findMany({
      where:{
          isPublished:true,
          
      },
      include:{
         
          category:true,
          chapters:{
              where:{
                  isPublished:true
              },
              
              select:{
                  id:true
              },
              
          },
          review:{
              select:{
                  id:true
              }
          },
          
        
      },
      orderBy:{
          createdAt:"desc"
      }
  })
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response("error while fetching course" + error, {
      status: 500,
    });
  }
}



export async function POST(req: Request):  Promise<void | Response> {
  try {
    
    const user = await auth();
    const { title } = await req.json();
    const userId=user?.user?.id as string
    
    const course = await db.course.create({ data: { userId,title } });
    const community=await db.community.create({data:{courseId:course.id,title:course.title}})

    return new Response(JSON.stringify(course), { status: 200 });
  } catch (e) {
    console.log(e);
    return  new Response("error while reordering chapters" + e, {
      status: 500,
    });
  }
}

export async function PUT(req: Request, params: { courseId: string }):  Promise<void | Response>{
  try {
   
    const data = await req.json();
    

    const chapter = await db.chapter.updateMany({
      where: {
        position: parseInt(data.list.order),
      },
      data: {
        position: parseInt(data.list.order) + 1,
      },
    });
    const chpater2 = await db.chapter.updateMany({
      where: {
        id: data.list.id,
      },
      data: {
        position: parseInt(data.list.order),
      },
    });
    return new Response("chapters reordered", { status: 200 });
  } catch (error) {
    return new Response("error while reordering chapters" + error, {
      status: 500,
    });
  }
}

// export async function GET(req: Request, params: { courseId: string }): Promise<void | Response> {
//   try {
//     const courses=  await db.course.findMany({
      
//         })
//     return new Response(JSON.stringify(courses), { status: 200 });
//   } catch (error) {
//     return new Response("error while fetching course" + error, {
//       status: 500,
//     });
//   }
// }
