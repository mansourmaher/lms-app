"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Attachment, Chapter, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Please enter a url",
  }),
});

interface AttachementFormProps {
  initialeData: Chapter & { resources: Attachment[] };
  courseId: any;
  chapterId: any;
}

export const AttachementFormChapter = ({
  initialeData,
  courseId,
  chapterId,
}: AttachementFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Clear any previous error messages
      toast.dismiss();
      console.log("values " + JSON.stringify(values));

      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/attachement`,
        values
      );

      toast.success("Attachment added");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Set loading to false whether successful or not
    }
  };

  const ondelete = async (attachemntId: string) => {
    try {
      setDeletingId(attachemntId);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/attachement/${attachemntId}`
      );
      toast.success("Attachment deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Add resources to your chapter
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add resources
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <>
            {initialeData.resources?.length === 0 && (
              <p className="text-sm mt-2 text-slate-500 italic">
                No attachment
              </p>
            )}
            {initialeData?.resources?.length > 0 && (
              <ul className="mt-2">
                {initialeData.resources.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="flex items-center space-x-2"
                  >
                    <File className="h-4 w-4" />
                    <a
                      href={attachment.url}
                      target="_blank"
                      className="text-sm text-slate-500 line-clamp-1"
                    >
                      {attachment.url}
                    </a>
                    {deletingId == attachment.id && (
                      <div>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingId !== attachment.id && (
                      <button
                        onClick={() => ondelete(attachment.id)}
                        className="ml-auto hover:opacity-75 transition"
                      >
                        <X className="h-4 w-4"></X>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-gray-500 mt-2">
            Add attachment to your course
          </div>
          {isLoading && (
            <div className="mt-2 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Saving attachment...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
