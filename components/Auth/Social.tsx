"use client"

import {FcGoogle} from "react-icons/fc"
import { Button} from "../ui/button"
import { FaGithub } from "react-icons/fa";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {signIn} from 'next-auth/react'







export const Social = () => {


    const connect=(data:string)=>{
        signIn(data,{callbackUrl:DEFAULT_LOGIN_REDIRECT})
        
            
      
    }

   
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={()=>{connect('google')}} >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={()=>{connect('github')}} >
                <FaGithub className="h-5 w-5"/>
                
            </Button>


        </div>
    )
}