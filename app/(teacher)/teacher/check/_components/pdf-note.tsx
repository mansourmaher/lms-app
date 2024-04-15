"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Editor } from "@/components/editor";
import axios from "axios";
import { getReportById } from "@/actions/teacher/get-reportById";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Please enter a note",
  }),

  grade: z.number().int().min(0).max(20, {
    message: "Please enter a valid grade",
  }),
});

interface FormProps {
  id: any;
}

export default function PdfNote({ id }: FormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [note, setNote] = useState("");
  const [grade, setGrade] = useState(0);
  const [souldBerefresh, setSouldBerefresh] = useState(false);
  const [initilagrade, setInitilagrade] = useState(0);

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await getReportById(id);
      setNote(res?.note as string);
      setGrade(res?.grade as number);
      setInitilagrade(res?.grade as number);
      form.setValue("note", res?.note as string);
      form.setValue("grade", res?.grade as number);
    };
    fetchData();
  }, [id, souldBerefresh]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   
    await axios
      .post("/api/teacher/keepNote", {
        reportId: id,
        grade: values.grade,
        note: values.note,
        initilagrade: initilagrade,
        
      })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setSouldBerefresh(!souldBerefresh);
      });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" className="gap-1.5" aria-label="fullscreen">
          Noter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keep a note to you student</FormLabel>
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

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keep a Grade to you student</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Grade"
                      {...field}
                      type="number"
                      min={0}
                      max={20}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
                    />
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
            {successMessage && (
              <div className="text-white bg-green-400 p-2 rounded-md">
                {successMessage}
              </div>
            )}
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
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
