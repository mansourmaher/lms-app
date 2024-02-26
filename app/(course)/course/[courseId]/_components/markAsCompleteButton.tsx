"use client";

import { markAsComplete } from "@/actions/Etudiant/mark-asComplete";
import { Button } from "@/components/ui/button";

import React from "react";
import toast from "react-hot-toast";

interface markAsCompleteButtonProps {
  userId: string;
  disabled?: boolean;

  chapterId: string;
}

export default function MarkAsCompleteButton({
  userId,
  disabled,

  chapterId,
}: markAsCompleteButtonProps) {

    const onclick=(chapterId:string,userId:string)=>{
        markAsComplete(chapterId,userId)
        toast.success("Chapter marked as complete")
        
        window.location.reload()
        
    }

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={() => onclick(chapterId,userId)}
      >
        Mark as complete
      </Button>
    </div>
  );
}
