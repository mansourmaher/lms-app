"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Please enter a url",
  }),
});

interface AttachementFormProps {
  initialeData: Course & { attachment: Attachment[] };
  courseId: any;
}

export const AttachementForm = ({
  initialeData,
  courseId,
}: AttachementFormProps) => {
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
      </div>

      {initialeData.attachment.length === 0 && (
        <p className="text-sm mt-2 text-slate-500 italic">No attachment</p>
      )}
      {initialeData.attachment.length > 0 && (
        <ul className="mt-2">
          {initialeData.attachment.map((attachment) => (
            <li key={attachment.id} className="flex items-center space-x-2">
              <File className="h-4 w-4" />
              <a
                href={attachment.url}
                target="_blank"
                className="text-sm text-slate-500 line-clamp-1"
              >
                {attachment.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
