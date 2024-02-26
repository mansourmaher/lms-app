"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import MuxPlayer from "@mux/mux-player-react";

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
import {
  ImageIcon,
  Pencil,
  PlusCircle,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Please enter a imageUrl",
  }),
});

interface ChapterVedioFormProps {
  initialeData: Chapter & { muxData?: MuxData | null };
  courseId: any;
  chapterId: any;
}
export const ChapterVedioForm = ({
  initialeData,
  courseId,
  chapterId,
}: ChapterVedioFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialeData?.videoUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated  updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Image form
        <Button variant="ghost" onClick={toggleEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialeData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Vedio
            </>
          )}
          {!isEditing && initialeData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Vedio
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialeData.videoUrl ? (
          <div className="flex items-center justify-center h-60">
            <VideoOffIcon className="h-12 w-12 text-gray-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {/*<MuxPlayer playbackId={initialeData.muxData?.playbackId} />*/}
            <video src={initialeData.videoUrl} controls></video>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-gray-500 mt-2">
            Upload this chpater vedio
          </div>
        </div>
      )}
      {initialeData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Video can take some time to process refresh the page if it does not
          appear
        </div>
      )}
    </div>
  );
};
