import { IconBadge } from "@/components/icon-badge"
import { db } from "@/lib/db"
import { ArrowBigLeft, EyeIcon, EyeOff, EyeOffIcon, File, Layers2, LayoutDashboardIcon, NotebookIcon, VideoIcon } from "lucide-react"
import { La_Belle_Aurore } from "next/font/google"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChapterTitleForm } from "./_components/chapter-title-form"
import { ChaperDescreptionFormForm } from "./_components/chpater-descreption"
import { ChapterAccesFormForm } from "./_components/chpater-access-form"
import { ChapterVedioForm } from "./_components/chpater-vedio-form"
import CharpterAction from "../../_components/chapterActions"
import Bannner from "@/components/banner"
import { AttachementFormChapter } from "./_components/chapter-resource"
import { ChapterToDo } from "./_components/chapter-todo"




 const EditChapter =async({params}:{params:{courseId:string,chapterId:string}})=>{


   
    const chpater=await db.chapter.findUnique({
        where:{
            id:params.chapterId,
            courseId:params.courseId
            
        },
        include:{
            muxData:true,
            resources:true,


        }
    })
    if(!chpater){
        return redirect("/")
    }

    const requiredFiels=[
        chpater.title,
        chpater.descreption,
        //chpater.videoUrl,
    ]
    const totalFields=requiredFiels.length;
    let filledFields=0;
    requiredFiels.map((field)=>{
       if(!field){
           return;
       }
         filledFields++;
        
    })
    //const filledFields = requiredFiels.filter(Boolean).length;

    const competeText=`${filledFields}/${totalFields} fields completed`

    const isComplete=requiredFiels.every(Boolean)


    return (
        <div>
            {!chpater.isPublished && (
                <Bannner title="This chapter is not yet published"/>
            )}
      


        <div className="p-6">
            {}
           <div className="flex items-center justify-between"> 
           <div className="w-full">
            <Link href={`/teacher/courses/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 translate-x-0"
            >
            <ArrowBigLeft className="h-6 w-6 mr-2"/>
            Back to course

            </Link>
            <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col gap-y-2">
                    <h1>
                        chpater Creation
                    </h1>
                    <span className="text-sm text-gray-500">
                        Complete the following fields to create a new chapter {competeText}
                    </span>

                </div>
                <CharpterAction
                courseId={params.courseId}
                chapterId={params.chapterId}
                disabled={isComplete}
                isPublished={chpater.isPublished}
                isCompleted={isComplete}
                />
            



           </div>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboardIcon}/>
                        <h2 className="text-sm text-gray-500">
                            Chapter details
                        </h2>

                    </div>
                   <ChapterTitleForm
                     courseId={params.courseId}
                    chapterId={params.chapterId}
                    initialeData={{
                            title:chpater.title,
                            descreption:chpater.descreption,
                            videoUrl:chpater.videoUrl,
                        }}
                     />
                     <div className="flex items-center gap-x-2 mt-6">
                        <IconBadge icon={NotebookIcon}/>
                        <h2 className="text-sm text-gray-500">
                            Chapter details
                        </h2>

                    </div>
                     <ChaperDescreptionFormForm
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        initialeData={chpater}
                        />
                        <div className="flex items-center gap-x-2 mt-6">
                        <IconBadge icon={Layers2}/>
                        <h2 className="text-sm text-gray-500">
                            Chapter details
                        </h2>

                    </div>
                        <ChapterToDo
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        initialeData={chpater}
                        />
                </div>
                <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={EyeIcon}/>
                    <h2 className="text-sm text-gray-500">
                        Acces settings

                    </h2>
                </div>
                </div>
                <ChapterAccesFormForm
                courseId={params.courseId}
                chapterId={params.chapterId}
                initialeData={chpater}
                />
                
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={VideoIcon}/>
                        <h2 className="text-sm text-gray-500">
                            Video
                        </h2>
                    </div>
                    <ChapterVedioForm
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    initialeData={chpater}
                    />
                     <div className="flex items-center gap-x-2 mt-6">
                     <IconBadge icon={File}/>
                        <h2 className="text-sm text-gray-500">
                            Attachement
                        </h2>
                    </div>
                    
                    
                        
                        <AttachementFormChapter
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                        initialeData={chpater}
                        />

                    </div>
                </div>
                
               
                </div>
               
        </div>
        

        

    )
}
export default EditChapter