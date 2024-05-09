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
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { ChapterList } from "./chpaterList";
import { list } from "postcss";
import { on } from "events";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a descreption",
  }),
});

interface ChapterFormProps {
  initialeData: Course & { chapters: Chapter[] };
  courseId: any;
}
export const ChapterForm = ({ initialeData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  const onReorder = async (
    updatedData: { id: string; position: number }[]
  ) => {};

  const onEdit = (id: string) => {
    router.push(`/admin/courses/${courseId}/chapter/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Course chapter
      </div>

      {!initialeData.chapters.length && (
        <p className="text-xs text-muted-foreground mt-4">No chapters yet</p>
      )}
      <ChapterList
        onEdit={onEdit}
        onReorder={onReorder}
        items={initialeData.chapters || []}
      />
    </div>
  );
};
