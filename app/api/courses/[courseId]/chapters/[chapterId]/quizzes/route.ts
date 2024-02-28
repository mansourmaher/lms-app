import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  try {
    const user =await  auth();
    const userId=user?.user.id
    const { courseId, chapterId,questions,optionss,name,isYesOrNo,correctOption } = await req.json();
    
   
    const optionReal = [optionss[0], optionss[1]];
    console.log(isYesOrNo)
    

    if (isYesOrNo) {
      optionReal.push(optionss[2], optionss[3]);
    }

    const filteredOptions = optionss.filter((option: null | undefined) => option !== null && option !== undefined && option !== "");
    
    filteredOptions.unshift(correctOption);
   



     
    
    const options=await db.options.create({
        data:{
          options:filteredOptions,
          quizId:"1",
          correctOption:correctOption
            
        }
    })
    const quiz= await db.quiz.create({ 
        data:{
            courseId:courseId,
            chapterId:chapterId,
            question:questions,
            answer:'1',
            options:{
                connect:{
                    id:options.id
                }
            }
        
        }
     });
     revalidatePath(`/api/courses/${courseId}/chapters/${chapterId}`);
     return new NextResponse("200")
  } catch (e) {
    console.log(e);
    return new NextResponse("200")
  }
}

 export async function GET(req: Request, { params }: { params: { courseId: string, chapterId: string } }): Promise<Response> {
try {
  const { courseId, chapterId } = params;

  const allquiz = await db.quiz.findMany({
    where: {
      chapterId: params.chapterId
    },
    include: {
      options: true
    }
  });

  return new Response(JSON.stringify(allquiz), { status: 200, headers: { 'Content-Type': 'application/json' }})
} catch (e) {
  console.log(e);
  return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500, headers: { 'Content-Type': 'application/json' }})
}
 }