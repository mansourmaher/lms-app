import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { log } from 'console';
import Mux from '@mux/mux-node';



const {Video} =new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
)



export async function PATCH(req:Request,{params}:{params:{
    courseId:string,
    chapterId:string
}})
{
    try{

        const data=await req.json()
        log(data)
        log(params)
        log("data"+data.videoUrl)
       


        const  chapter=await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId,
            },
            data:{

                title:data.title,
                descreption:data.description,
                videoUrl:data.videoUrl,
                isFree:data.isFree,
                isPublished:data.isPublished,
               
                

            }
        })

        if(data.videoUrl){
            const existingmuxDate=await db.muxData.findFirst({
                where:{
                    chapterId:params.chapterId
                }
            })
            if(existingmuxDate){
                await Video.Assets.del(existingmuxDate.assetId);
                await db.muxData.delete({
                    where:{
                        chapterId:params.chapterId
                    }
                })

            }
            const asset=await Video.Assets.create({
                input:data.videoUrl,
                playback_policy:['public'],
                mp4_support:'standard',
                passthrough:data.videoUrl,
                test:true,
                
                per_title_encode:false,
                
            })
            await db.muxData.create({
                data:{
                    chapterId:params.chapterId,
                    assetId:asset.id,
                   playbackId:asset.playback_ids?.[0]?.id || "",
                    
                }
            })
            

        }

        return new NextResponse("200")
        
       
    }catch(e){
        log(e)
        return new NextResponse("eroor while updating chapter")
    }

}


export async function DELETE(req:Request,{params}:{params:{chapterId:string}})

{
    try{
        log(params)
        // const maxData=await db.muxData.delete({
        //     where:{
        //         chapterId:params.chapterId
        //     }
        // })
        const chapter=await db.chapter.delete({
            where:{
                id:params.chapterId
            }
        })
        
        return new NextResponse("200")
    }catch(e){
        log(e)
        return new NextResponse("eroor while deleting chapter")
    }
}


