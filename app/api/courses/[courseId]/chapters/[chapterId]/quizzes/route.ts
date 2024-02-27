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
     return { status: 200, body: JSON.stringify(quiz) };
  } catch (e) {
    console.log(e);
    return { status: 500, body: { error: "Something went wrong" } };
  }
}

export async function GET(req: Request,{params}:{params:{courseId:string,chapterId:string}}) {

    

  try {
    const { courseId, chapterId } = params;
    
    const allquiz=await db.quiz.findMany({
        where:{
            chapterId:params.chapterId
        },
        include:{
            options:true
        }
    })

    
   
    return  { status: 200, body: JSON.stringify(allquiz) };
  } catch (e) {
    console.log(e);

    return { status: 500, body: { error: "Something went wrong" } };
  }
}