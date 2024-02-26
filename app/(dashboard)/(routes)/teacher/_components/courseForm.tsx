import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Image from "next/image";



interface CourseFormProps{
    initialeData?:Course;
}
const CourseForm=({initialeData}:CourseFormProps)=>{
    return(
        
        
        <div className=" overflow-hidden shadow-lg rounded-xl  py-3">
            <div className="h-64">

           
            <Image
            src={initialeData?.imageUrl||"/images/1.jpg"}
            

            alt="Picture of the author"
            layout="responsive"
            
            width={500}
            height={500}
            objectFit="cover"

          
        
            />
            </div>
            
           
            <div className="px-6 py-3 bg-slate-400">
                <div className="font-bold text-xl mb-2"> {initialeData?.title}</div>
                <p className="text-gray-700 text-base">
                    {initialeData?.description}
                   
                </p>
        
                <p>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Category</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Price</span>

                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Level</span>
                </p>
                </div>
                <div className="flex justify-between p-3 bg-slate-400">
                    <Button
                    variant="ghost"
                    className="mr-2 bg-sky-400"
                    >
                        Consulter 
                    </Button>

                   

                </div>
        </div>
        
    )
}

export default CourseForm;