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
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const formSchema=z.object({
    title:z.string().min(1,{
        message:"Please enter a title"
    }),
    })

interface ChapterTitleFormProps {
  initialeData: {
    title:string,
    descreption:any,
    videoUrl:any,
  }
  courseId: any;
  chapterId:string
}
export const ChapterTitleForm = ({initialeData,courseId,chapterId}:ChapterTitleFormProps) => {
    const router=useRouter();
    const [isEditing,setIsEditing]=useState(false);
    const toggleEditing=()=>{
        setIsEditing(!isEditing)
    }
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialeData
    })
    const {isSubmitting,isValid}=form.formState;
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values);
            toast.success("Title updated");
            toggleEditing();
            router.refresh();

        }catch(error){
            toast.error("Something went wrong");

        }

    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
            <div className="font-medium flex items-center justify-between">

            Chpater Title 
            <Button variant="ghost" onClick={toggleEditing}>
                {
                    isEditing && (
                        <>
                        Cancel
                        </>
                    )
                }
                {!isEditing && (

                <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit title
                </>
                )}
                

            </Button>

            </div>
            {
                !isEditing && (
                    <p className="">
                    {initialeData.title}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                            <FormField 
                            control={form.control}
                            name="title"
                            
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} disabled={isSubmitting} 
                                        placeholder="e.g. Introduction to programming"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.title?.message}
                                        </FormMessage>
                                </FormItem>
                            )}
                            />
                            <div className="flex items-center gap-x-2">
                                
                                <Button
                                type="submit" 
                                disabled={!isValid || isSubmitting}
                                >
                                    Save
                                </Button>
                            </div>
                            </form>
                            </Form>

                            
                )
            }
            
        </div>
    )
}

