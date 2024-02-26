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
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Editor } from "../editor";
//import { QuizSchema } from "@/schemas";

interface ConfirmModelProps {
  chpaterId: string;
  courseId: string;
}


export const QuizModel = ({ chpaterId, courseId }: ConfirmModelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOptions34, setShowOptions34] = useState(true); // State to track checkbox status

  const QuizSchema = showOptions34
  ? z.object({
      question: z.string().min(1, { message: "Please enter a question" }),
      option1: z.string().min(1, { message: "Please enter option 1" }),
      option2: z.string().min(1, { message: "Please enter option 2" }),
      option3: z.string().min(1, { message: "Please enter option 3" }),
      option4: z.string().min(1, { message: "Please enter option 4" }),
    })
  : z.object({
      question: z.string().min(1, { message: "Please enter a question" }),
      option1: z.string().min(1, { message: "Please enter option 1" }),
      option2: z.string().min(1, { message: "Please enter option 2" }),
    });




  // const removeHtmlTags = (htmlString: any) => {
  //   const doc = new DOMParser().parseFromString(htmlString, "text/html");
  //   return doc.body.textContent || "";
  // };

  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
    shouldFocusError: true,
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },


  });
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOptions34(!e.target.checked);
  };

  const saveQuiz = async (data: any) => {
    //const questions = removeHtmlTags(data.question);
    let options: string[] = [];
    
       options = [data.option1, data.option2, data.option3, data.option4];
    

    setIsOpen(true);
    const quiz = {
      courseId: courseId,
      chapterId: chpaterId,
      name: data.quizName,
      questions: data.question,
      optionss: options,
      
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
      });
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
              <FormLabel>{showOptions34 ? "Multiple Choice" : "Yes/No"}</FormLabel>
              <div className="flex flex-row gap-3 items-center justify-center">
              
              <FormLabel>{showOptions34 ? "Yes/No" : "Multiple Choice"}</FormLabel>
            
              <Switch  onCheckedChange={() => {setShowOptions34(!showOptions34)}} />
              
              
              <input
                type="checkbox"
                className=""
                name="checkbox"
                onChange={handleCheckboxChange}
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
                    <FormMessage>
                      {form.formState.errors.question?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormLabel className="text-green-600  flex mt-6">
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
                    <FormMessage>
                      {form.formState.errors.option1?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormLabel className="text-red-600 flex mt-3">
                Put here your second option
              </FormLabel>
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
                    <FormMessage>
                      {form.formState.errors.option2?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              {showOptions34 && (
                <>
              <FormLabel className="text-red-600 flex  mt-3">
                Put here your third option
              </FormLabel>
              <FormField
                control={form.control}
               
                name="option3"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Third option"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage>
                      {/* @ts-ignore */}

                      {form.formState.errors.option3?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormLabel className="text-red-600 flex  mt-3">
                Put here your fourth option
              </FormLabel>
              <FormField
                control={form.control}
                

                name="option4"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Forth  option"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </FormControl>
                    <FormMessage>
                      {/* @ts-ignore */}

                      {form.formState.errors.option4?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              </>
              )}
              <div className="flex justify-end">
                <Button type="submit" disabled={!form.formState.isValid}>
                  Save
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
