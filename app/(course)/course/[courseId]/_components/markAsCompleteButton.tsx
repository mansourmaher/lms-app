"use client";

import { markAsComplete } from "@/actions/Etudiant/mark-asComplete";
import { Button } from "@/components/ui/button";

import React from "react";
import toast from "react-hot-toast";

interface markAsCompleteButtonProps {
  
  disabled?: boolean;

  chapterId: string;
  courseId: string;
}

export default function MarkAsCompleteButton({
 
  disabled,
  courseId,

  chapterId,
}: markAsCompleteButtonProps) {

    const onclick=(chapterId:string)=>{
        markAsComplete(chapterId, courseId)
        toast.success("Chapter marked as complete")
        
        window.location.reload()
        
    }

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={() => onclick(chapterId)}
      >
        Mark as complete
      </Button>
    </div>
  );
}
