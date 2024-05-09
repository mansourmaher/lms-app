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
import { ComboxBox } from "@/components/ui/combo-box";
const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Please select a category",
  }),
});

interface CategoryFormProps {
  initialeData: Course;
  courseId: any;
  options: { label: string; value: string }[];
}
export const CategoryForm = ({
  initialeData,
  courseId,
  options,
}: CategoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialeData?.categoryId || "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  const selectedOption = options.find(
    (option) => option.value === initialeData.categoryId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        category form
      </div>

      <p
        className={cn(
          "text-sm mt-2",
          !initialeData.categoryId && "text-gray-500"
        )}
      >
        {selectedOption?.label || "No Category"}
      </p>
    </div>
  );
};
