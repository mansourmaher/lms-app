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
const formSchema = z.object({
  description: z.string().min(1, {
    message: "Please enter a descreption",
  }),
});

interface ChaperDescreptionFormProps {
  initialeData: Chapter;
  courseId: any;
  chapterId: any;
}
export const ChaperDescreptionFormForm = ({
  initialeData,
  courseId,
  chapterId,
}: ChaperDescreptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialeData?.descreption || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter  updated");
      toggleEditing();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Descreption Chapter
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialeData.descreption && "text-gray-500"
          )}
        >
          {initialeData.descreption && "No descreption"}
          {initialeData.descreption && (
            <Previews value={initialeData.descreption} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.description?.message}
                  </FormMessage>
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
