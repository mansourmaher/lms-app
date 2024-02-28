import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Editor } from "../editor";
import { revalidatePath } from "next/cache";
import { MdAddComment } from "react-icons/md";
//import { QuizSchema } from "@/schemas";

interface ConfirmModelProps {
  chpaterId: string;
  courseId: string;
}

export const QuizModel = ({ chpaterId, courseId }: ConfirmModelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOptions34, setShowOptions34] = useState(true); // State to track checkbox status

  const MultipleQuizSchema = z.object({
    question: z.string().min(1, { message: "Please enter a question" }),
    option1: z.string().min(1, { message: "Please enter option 1" }),
    option2: z.string().min(1, { message: "Please enter option 2" }),
  });
  const YesOrNoQuizSchema = z.object({
    question: z.string().min(1, { message: "Please enter a question" }),
    option1: z.string().min(1, { message: "Please enter option 1" }),
    option2: z.string().min(1, { message: "Please enter option 2" }),
  });

  const form = useForm({
    resolver: zodResolver(
      showOptions34 ? MultipleQuizSchema : YesOrNoQuizSchema
    ),
  });

  const saveQuiz = async (data: any) => {
    const options = staticOptions;
    options.unshift(data.option2);

    setIsOpen(true);
    const quiz = {
      courseId: courseId,
      chapterId: chpaterId,
      name: data.quizName,
      questions: data.question,
      optionss: options,
      correctOption: data.option1,

      isYesOrNo: showOptions34,
    };
    const response = axios.post(
      `/api/courses/${courseId}/chapters/${chpaterId}/quizzes`,
      quiz
    );
    toast
      .promise(response, {
        loading: "Adding quiz...",
        success: "Quiz added successfully",
        error: "Error adding quiz",
      })
      .then(() => {
        setIsOpen(true);
        form.reset();
        form.setValue("option1", "");
        form.setValue("option2", "");
        setStaticOptions([""]);
      });
  };

  const [staticOptions, setStaticOptions] = useState([""]);
  // useEffect(() => {
  //   console.log("staticOptions updated:", staticOptions);
  // }, [staticOptions]);

  const onAddMoreClick = async (data: any) => {
    await setStaticOptions((prev) => {
      const updatedOptions = [...prev, data.option2];

      return updatedOptions;
    });

    form.resetField("option2");
    form.setValue("option2", "");
  };

  return (
    <>
      <Toaster />
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger className="flex items-center gap-x-2">
          <Plus size={25} />
          <span>Add Quiz</span>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[50%]">
          <AlertDialogTitle>Add Quiz to your chapter</AlertDialogTitle>
          <AlertDialogDescription>
            Here you can add some quiz to your chapter
          </AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(saveQuiz)}
              className="space-y-4 mt-4"
            >
              <div className="flex flex-row justify-between items-center">
                <FormLabel>
                  {showOptions34 ? "Multiple Choice" : "Yes/No"}
                </FormLabel>
                <div className="flex flex-row gap-3 items-center justify-center">
                  <FormLabel>
                    {showOptions34 ? "Yes/No" : "Multiple Choice"}
                  </FormLabel>

                  <Switch
                    onCheckedChange={() => {
                      setShowOptions34(!showOptions34);
                    }}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel className="  flex mt-6">
                Put here your first option and it should be the correct one
              </FormLabel>
              <FormField
                control={form.control}
                name="option1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="first option"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel className="flex mt-3">
                Put here your second option
              </FormLabel>
              <div className="flex flex-row justify-between  items-center">
                <div className="flex-1 ">
                  <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            {...field}
                            type="text"
                            placeholder="Second option"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {showOptions34 ? (
                    <Button
                      type="button"
                      size={"sm"}
                      className="ml-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={() => {
                        onAddMoreClick(form.getValues());
                      }}
                    >
                      <MdAddComment size={25} />
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="">
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};
