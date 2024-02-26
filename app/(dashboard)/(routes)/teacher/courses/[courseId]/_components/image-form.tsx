"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormDescription,
    FormMessage,
    FormLabel,
    FormField,
    FormItem,
}from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
const formSchema=z.object({
    imageUrl:z.string().min(1,{
        message:"Please enter a imageUrl"
    }),
    })

interface ImageFormProps {
  initialeData: Course
  courseId: any;
}
export const ImageForm = ({initialeData,courseId}:ImageFormProps) => {
    const router=useRouter();
    const [isEditing,setIsEditing]=useState(false);
    const toggleEditing=()=>{
        setIsEditing(!isEditing)
    }
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            imageUrl:initialeData?.imageUrl || ""
        }
    })
    const {isSubmitting,isValid}=form.formState;
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Descreption  updated");
            toggleEditing();
            router.refresh();

        }catch(error){
            toast.error("Something went wrong");

        }

    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
            <div className="font-medium flex items-center justify-between">

            Image form
            <Button variant="ghost" onClick={toggleEditing}>
                {
                    isEditing && (
                        <>
                        Cancel
                        </>
                    )
                }
                {!isEditing && !initialeData.imageUrl &&(
                    <>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Add Image
                    </>
                )
                    }
                {!isEditing && initialeData.imageUrl && (

                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit Image
                </>
                )}
                

            </Button>

            </div>
            {
                !isEditing && (
                    !initialeData.imageUrl ? (
                        <div className="flex items-center justify-center h-60">
                            <ImageIcon className="h-12 w-12 text-gray-500"/>
                            </div>
                    
                ):(
                    <div className="relative aspect-video mt-2">
                        <Image
                        alt="Upload"
                        fill
                        className="object-cover rounded-md"
                        src={initialeData.imageUrl}
                        >

                        </Image>
                        </div>

                )
                )
            }
            {
                isEditing && (
                        <div>
                            <FileUpload
                            endpoint="courseImage"
                            onChange={(url)=>{
                                if(url){
                                    onSubmit({imageUrl:url})

                                }
                            }}
                            />
                            <div className="text-xs text-gray-500 mt-2">
                                Upload a image
                            </div>
                        </div>
                        
                        
                           
                            

                            
                )
            }
            
        </div>
    )
}

