"use client"
import { CardWrapper } from "@/components/Auth/Card-wrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
    FormField,


} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Auth/Form-error";
import { FormSucces } from "@/components/Auth/Form-succes";
import { useState, useTransition } from "react";
import { Reset } from "@/actions/reset";


    



export const ResetForm = () => {
    


    const [isPending,startTransition]=useTransition()
    const [error,setError]=useState<string | undefined>("")
    const [succes,setSucces]=useState<string | undefined>("")
    const form=useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email:"",

            
        }


    })
    const onSubmit=(values:z.infer<typeof ResetSchema>)=>{
        setError("")
        setSucces("")
        startTransition(()=>{

            Reset(values).then((result)=>{
                setError(result?.error)
                setSucces(result?.succes)
                
                localStorage.setItem("email",values.email)
            })
            
        })
        
    }

    return(
        <CardWrapper
        headerLabel="Enter a new Password"
        backButtonLabel="back To login"
        backButtonHref="/sign-in"
       
        >
            <Form
            {...form}
            >
                <form onSubmit={form.handleSubmit(()=>{})}
                className="space-y-6"
                >
                    <div className="space-y-6">
                        <FormField
                        control={form.control}
                        name="email"
                        
                        render={({field})=>(
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Email"
                                    type="email"
                                    
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.email?.message}
                                </FormMessage>
                            </FormItem>
                            
                        )}



                        />
                         
                        </div>
                        <FormError message={error}/>
                        <FormSucces message={succes}/>
                        <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                        onClick={form.handleSubmit(onSubmit)}
                        >
                            Reset Password
                        </Button>
                    

                       

                </form>

            </Form>
            
        </CardWrapper>
    )
}