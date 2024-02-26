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
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
const formSchema=z.object({
    price:z.string().min(1,{
        message:"Please enter a price"
    }),
    })

interface PriceFormProps {
  initialeData:Course
  courseId: any;
}
export const PriceForm = ({initialeData,courseId}:PriceFormProps) => {
    const router=useRouter();
    const [isEditing,setIsEditing]=useState(false);
    const toggleEditing=()=>{
        setIsEditing(!isEditing)
    }
    

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            price:initialeData.price?.valueOf().toString()
        }
      
    })
    const {isSubmitting,isValid}=form.formState;
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            const data=values+"$"
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Price  updated");
            toggleEditing();
            router.refresh();

        }catch(error){
            toast.error("Something went wrong");

        }

    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
           
            <div className="font-medium flex items-center justify-between">

            The price of your course
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
                Edit price 
                </>
                )}
                

            </Button>

            </div>
            {
                !isEditing && (
                    <p className={cn(
                        "text-sm mt-2",
                        !initialeData.price && "text-gray-500"
                    )}>
                    { "$"+ initialeData.price  || "No price"}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                            <FormField 
                            control={form.control}
                            name="price"
                            
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} disabled={isSubmitting} 
                                        placeholder="e.g. 'set a price for your course'"
                                        step="0.01"
                                        type="number"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.price?.message}
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

