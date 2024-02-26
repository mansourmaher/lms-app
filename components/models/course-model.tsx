"use client";

import {

    AlertDialog,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogCancel,

    AlertDialogAction,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogOverlay,
    
    AlertDialogFooter,
    
    

}from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react";
import { Children } from "react";


interface ConfirmModelProps{
    courseId:string,

    onDelete:(id:string)=>void}




export const ConfirmModel=({onDelete,courseId}:ConfirmModelProps)=>{
    return(
        <AlertDialog>
        <AlertDialogTrigger className="flex items-center gap-x-2">
            <TrashIcon/>
            
        </AlertDialogTrigger>
        <AlertDialogContent className="w-96">
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to delete this course? You cant undo this action afterwards.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 text-white" onClick={()=>{onDelete(courseId)}}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogOverlay/>
    </AlertDialog>
    )
}
