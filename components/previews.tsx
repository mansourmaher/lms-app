"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

import "react-quill/dist/quill.bubble.css"

interface PreviewsProps{
    value: string

}

export const Previews=({value}:PreviewsProps)=>{
    
    const ReactQuill=useMemo(()=>dynamic(()=>import("react-quill"),{ssr:false}),[])

    return(
     
        <ReactQuill
        theme="snow"
        value={value}
        readOnly={true}
        
        />
       
    )

}