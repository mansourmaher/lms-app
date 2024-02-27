"use client"
import { CardWrapper } from "./Card-wrapper"

import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormLabel,
    FormItem,
    FormMessage,
    FormField,


} from "../ui/form"
import { LoginSchema } from "@/schemas"
import { z } from "zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "./Form-error";
import { FormSucces } from "./Form-succes";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
    



export const LoginForm = () => {
    const searchParams=useSearchParams()
    const errorParam=searchParams.get("error")==="OAuthAccountNotLinked"? "Account not linked with this email":""


    const [isPending,startTransition]=useTransition()
    const [error,setError]=useState<string | undefined>("")
    const [succes,setSucces]=useState<string | undefined>("")
    const form=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",

            password:""
        }


    })
    const onSubmit=(values:z.infer<typeof LoginSchema>)=>{
        setError("")
        setSucces("")
        startTransition(()=>{

            login(values).then((result)=>{
                setError(result?.error)
                
                setSucces(result?.success)
                
                localStorage.setItem("email",values.email)
            })
            
        })
        
    }

    return(
        <CardWrapper
        headerLabel="Wellcome Back"
        backButtonLabel="Dont have an account? Sign Up"
        backButtonHref="/sign-up"
        showSocial={true}
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
                         <FormField
                        control={form.control}
                        name="password"
                        
                        render={({field})=>(
                            <FormItem>
                                <FormLabel htmlFor="password">password</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="*******"
                                    type="password"
                                    
                                    />
                                </FormControl>
                                <Button
                                variant="link"
                                asChild
                                className="px-0 font-normal"
                                >
                                    <Link href="/reset">
                                       Forgot Password?
                                       </Link>
                                        

                                </Button>
                                <FormMessage>
                                    {form.formState.errors.password?.message}
                                </FormMessage>
                            </FormItem>
                            
                        )}



                        />
                        </div>
                        <FormError message={error || errorParam}/>
                        <FormSucces message={succes}/>
                        <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                        onClick={form.handleSubmit(onSubmit)}
                        >
                            Login
                        </Button>
                    

                       

                </form>

            </Form>
            
        </CardWrapper>
    )
}