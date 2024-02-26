"use client"
import { CardWrapper } from "@/components/Auth/Card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/Auth/Form-error";
import { FormSucces } from "@/components/Auth/Form-succes";
import { AcceptRequest } from "@/actions/admin/accept-request";
export const AcceptRequestForm = () => {

    const [error,setError]=useState<string | undefined>("")
    const [success,setSuccess]=useState<string | undefined>("")
    const searchParam=useSearchParams()
    const id=searchParam.get("id")

    const onsubmit=useCallback(async()=>{
        if(success || error)
        {
            return
        }
        if(!id)
        {
            setError("Missing Id")
            return
        }
        AcceptRequest(id).then((data)=>{
            setSuccess(data.success)
            setError(data.error)

        })
    }
    ,[id,success,error])
    useEffect(()=>{
        if(success || error)
        {
            return
        }
        onsubmit()
    },[onsubmit])

    return (
       <CardWrapper
         headerLabel="Access Request"
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