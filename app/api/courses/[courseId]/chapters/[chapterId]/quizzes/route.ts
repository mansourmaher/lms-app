import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const user =await  auth();
    const userId=user?.user.id
    const { courseId, chapterId,questions,optionss,name,isYesOrNo } = await req.json();
    
    if (!userId) {
      return {
        status: 400,
        body: { error: "You must be logged in to create a course" },
      };
    }
    const optionReal = [optionss[0], optionss[1]];
    console.log(isYesOrNo)
    

    if (isYesOrNo) {
      optionReal.push(optionss[2], optionss[3]);
    }

    const filteredOptions = optionReal.filter(option => option !== null && option !== undefined);


     
    
    const options=await db.options.create({
        data:{
          options:filteredOptions,
          quizId:"1",
          correctOption:optionReal[0]
            
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
    return new NextResponse(JSON.stringify(quiz), { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Something went wrong" });
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

    
   
    return new NextResponse(JSON.stringify(allquiz), { status: 200 });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: "Something went wrong" });
  }
}