"use client"
import { CardWrapper } from "@/components/Auth/Card-wrapper";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/Auth/Form-error";
import { FormSucces } from "@/components/Auth/Form-succes";
export const NewVerificationPage = () => {

    const [error,setError]=useState<string | undefined>("")
    const [success,setSuccess]=useState<string | undefined>("")
    const searchParam=useSearchParams()
    const token=searchParam.get("token")

    const onsubmit=useCallback(async()=>{
        if(success || error)
        {
            return
        }
        if(!token)
        {
            setError("Missing token")
            return
        }
        newVerification(token).then((data)=>{
            setSuccess(data.success)
            setError(data.error)

        })
    }
    ,[token,success,error])
    useEffect(()=>{
        if(success || error)
        {
            return
        }
        onsubmit()
    },[onsubmit])

    return (
       <CardWrapper
         headerLabel="Verification"
         backButtonLabel="Back to Sign In"
            backButtonHref="/sign-in"
            >
                <div className="flex items-center w-full justify-center">
                    {!error && !success &&
                    <BeatLoader  />
                    }
                    {!success &&
                     <FormError message={error}/>
                    }
                <FormSucces message={success}/>

                </div>
               

            </CardWrapper>




    );
    }