"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormMessage,
    FormLabel,
    FormField,
    FormItem,
    


}from "@/components/ui/form"

import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input"; 
import Link from "next/link";
import toast from "react-hot-toast";
import { auth } from "@/auth";
const formSchema=z.object({
    title:z.string().min(1,{
        message:"Please enter a title"
    }),
    })
const CreatePage = () => {
    const router=useRouter();
    

    const form =useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:"",
        }
    });
    const {isSubmitting,isValid} =form.formState;
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{

        try{
            const response=await axios.post("/api/courses",values);
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success("Course created");
        }catch(error){
           toast.error("Something went wrong");
        }
        
    }
    //for the openAi neow
   

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center  h-full p-6">
            <div>
            <h1 className="text-2xl">Create a course</h1>
            <p className="text-sm text-slate-600 ">
                Create a course and add chapters to it
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">

                    <FormField 
                    control={form.control}
                    name="title"
                    render={({field})=>(
                        <FormItem>
                              <FormLabel>
                                    Course title
                              </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isSubmitting} 
                                    placeholder="e.g. Introduction to programming"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Give your course a title
                                </FormDescription>
                                <FormMessage>
                                    {form.formState.errors.title?.message}
                                    </FormMessage>

                            </FormItem>

                    )}
                    />
                    <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button size="sm" type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                        type="submit" 
                        disabled={!isValid || isSubmitting}
                        >
                            continue
                        </Button>
                    </div>

                   

                    </form>


            </Form>
            </div>
        </div>
    )
}
export default CreatePage;