"use client"
import { CardWrapper } from "@/components/Auth/Card-wrapper";

import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
    FormField,


} from "@/components/ui/form"
import { NewPasswordSchema } from "@/schemas"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Auth/Form-error"; 
import { FormSucces } from "@/components/Auth/Form-succes";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Reset } from "@/actions/reset";

import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";


    



export const NewPasswordForm = () => {
    const  searchParam=useSearchParams()
    const token=searchParam.get("token")    
    


    const [isPending,startTransition]=useTransition()
    const [error,setError]=useState<string | undefined>("")
    const [succes,setSucces]=useState<string | undefined>("")
    const form=useForm<z.infer<typeof NewPasswordSchema>>({
        resolver:zodResolver(NewPasswordSchema),
        defaultValues:{
            password:"",

            
        }


    })
    const onSubmit=(values:z.infer<typeof NewPasswordSchema>)=>{
        setError("")
        setSucces("")
        if(!token){
            setError("Invalid tokennnnnnnnnn")
            return
        }
        startTransition(()=>{

            newPassword(values, token).then((result)=>{
                setError(result?.error)
                setSucces(result?.succes)
                
                
            })
            
        })
        
    }

    return(
        <CardWrapper
        headerLabel="Rest you password"
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
                        name="password"
                        
                        render={({field})=>(
                            <FormItem>
                                <FormLabel htmlFor="email">Please enter a new Password</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                    
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.password?.message}
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