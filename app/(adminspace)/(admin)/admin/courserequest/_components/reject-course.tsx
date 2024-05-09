"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";
import { rejectCourseByid } from "@/actions/admin/verifie-course";
import { useRouter } from "next/navigation";
import { RejectCourseSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/editor";
interface ValidateCourseProps {
  id: string;
}

export default function RejectCourse({ id }: ValidateCourseProps) {
  const form = useForm<z.infer<typeof RejectCourseSchema>>({
    resolver: zodResolver(RejectCourseSchema),
  });
  const [isloading, setIsloading] = React.useState(false);
  const router = useRouter();
  const rejectCourse = async () => {
    setIsloading(true);
    await rejectCourseByid(id, form.getValues().reason);
    setIsloading(false);
    router.push(`/admin/courserequest`)
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-medium p-1" asChild>
        <Button variant={"destructive"} size={"sm"}>
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reject the
            course and the teacher will be notified.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-w-2xl w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(rejectCourse)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Why do you want to reject this course?
                    </FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormDescription>
                      <span>
                        This note will be visible to the student when they open
                        the document.
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {successMessage && (
                <div className="text-white bg-green-400 p-2 rounded-md">
                  {successMessage}
                </div>
              )} */}
              <div className="flex justify-end">
                <Button
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  type="submit"
                  variant={"primary"}
                  //put it in the right
                >
                  {form.formState.isSubmitting ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  onClick={() => form.reset()}
                  className="ml-2"
                  variant={"secondary"}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
