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
import { Course } from "@prisma/client";
const formSchema = z.object({
  description: z.string().min(1, {
    message: "Please enter a descreption",
  }),
});

interface DescreptionFormProps {
  initialeData: Course;
  courseId: any;
}
export const DescreptionForm = ({
  initialeData,
  courseId,
}: DescreptionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialeData?.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Descreption form
      </div>

      <p
        className={cn(
          "text-sm mt-2",
          !initialeData.description && "text-gray-500"
        )}
      >
        {initialeData.description || "No descreption"}
      </p>
    </div>
  );
};
