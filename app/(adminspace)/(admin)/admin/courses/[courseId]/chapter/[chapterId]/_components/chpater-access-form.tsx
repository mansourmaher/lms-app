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
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Editor } from "@/components/editor";
import { Previews } from "@/components/previews";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  isFree: z.boolean().default(false),
});

interface ChapterAccesFormProps {
  initialeData: Chapter;
  courseId: any;
  chapterId: any;
}
export const ChapterAccesFormForm = ({
  initialeData,
  courseId,
  chapterId,
}: ChapterAccesFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialeData?.isFree),
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Access  updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Acces to the course
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialeData.descreption && "text-gray-500"
          )}
        >
          {!initialeData.isFree && (
            <p>
              This chapter is only accessible to students who have purchased the
              course
            </p>
          )}

          {initialeData.isFree && (
            <p>This chapter is accessible to all students</p>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Free chapter</FormLabel>
                    <FormDescription>
                      This chapter will be accessible to all students
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
