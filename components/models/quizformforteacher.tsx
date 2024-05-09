import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogTitle, AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogOverlay,
    AlertDialogFooter
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { handeldeletequiz } from "@/actions/teacher/handeldeletequiz";

const formSchema = z.object({
  question: z.string().min(1, {
    message: "Please enter a question",
  }),
  option1: z.string().min(1, {
    message: "Please enter option 1",
  }),
  option2: z.string().min(1, {
    message: "Please enter option 2",
  }),
  option3: z.string().min(1, {
    message: "Please enter option 3",
  }),
  correctOption: z.string().min(1, {
    message: "Please enter a correct option",
  }),
});

interface ConfirmModelProps {
  chapterId: string;
  courseId: string;
}

export const QuizFormForteacher = ({
  chapterId,
  courseId,
}: ConfirmModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [quiz, setQuiz] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = React.useState<Number>(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [dipslayResult, setDipslayResult] = useState(false);
  const [seccondAvailable, setSeccondAvailable] = useState(10);
  const [options, setOptions] = useState([]);
  const [isFalse, setIsFalse] = useState(false);
  const [id, setId] = useState("");
  const [isloading, setIsloading] = useState(false);

  const hadeldeletequiz = async (id: string) => {
    setIsloading(true);
    await handeldeletequiz(id);
    setIsloading(false);
    getAllQuiz();
  };

  const cureentQuestion = useMemo(() => {
    //@ts-ignore
    console.log(quiz[questionIndex]);
    //@ts-ignore
    setOptions(quiz[questionIndex]?.options[0].options);
    //@ts-ignore
    setId(quiz[questionIndex]?.id);
    return quiz[questionIndex];
  }, [questionIndex, quiz,isloading]);

  const getAllQuiz = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${courseId}/chapters/${chapterId}/quizzes`
      );
      setQuiz(response.data);

      setOptions(response.data[0].options[0].options);

      console.log("options 2", options);
      console.log("quiz", response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleShowQuiz = async () => {
    setIsOpen(true);
    setSeccondAvailable(10);
    getAllQuiz();
  };

  return (
    <>
      <Toaster />
      <AlertDialog onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger
          className="flex items-center gap-x-2"
          onClick={handleShowQuiz}
          asChild
        >
          <Button className="rounded-full p-4" size="sm" variant="ghost">
            <span>Try  Quiz</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[40%]">
          <div className="flex flex-row justify-between">
            <AlertDialogTitle>Quizzes for Your Chapter</AlertDialogTitle>
          </div>

          {!cureentQuestion && dipslayResult && correctAnswer > wrongAnswer ? (
            <div>
              <h1 className="bg-green-300 border p-2">
                🎉 Congratulation you have passed the quiz
              </h1>
            </div>
          ) : !cureentQuestion &&
            dipslayResult &&
            correctAnswer < wrongAnswer ? (
            <div>
              <h1 className="bg-red-300 border p-2">
                Sorry 😢 you have failed in the quiz please restart it to unlock
                the next chapter
              </h1>
            </div>
          ) : null}

          <AlertDialogDescription>
            <div className="mb-6 mt-6">
              {/* <Stepper steps={quiz} currentStep={questionIndex + 1}  isFalse={isFalse} /> */}
            </div>
            {cureentQuestion ? (
              <div>
                <div>
                  <h1
                    dangerouslySetInnerHTML={{
                      // @ts-ignore

                      __html: cureentQuestion.question,
                    }}
                  />
                </div>
                {options.map((option, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => {}}
                      variant={
                        selectedOption === index + 1 ? "default" : "secondary"
                      }
                      className="justify-start w-full mb-3 mt-6"
                    >
                      {index + 1}. {option}
                    </Button>
                  </div>
                ))}
              </div>
            ) : null}
          </AlertDialogDescription>

          <AlertDialogFooter className="flex items-center space-x-4 px-6">
            <Button
              type="button"
              onClick={() => {
                setQuestionIndex(questionIndex - 1);
              }}
              className="flex-1"
              variant={"green"}
              disabled={questionIndex === 0}
            >
              Previews
            </Button>
            <Button
              type="button"
              onClick={() => {
                //@ts-ignore
                hadeldeletequiz(quiz[questionIndex]?.id);
              }}
              variant={"destructive"}
              className="flex-1"
              //@ts-ignore
              disabled={!quiz[questionIndex]?.id || isloading}
            >
              {isloading ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setQuestionIndex(questionIndex + 1);
              }}
              className="flex-1"
              variant={"primary"}
              disabled={questionIndex === quiz.length - 1}
            >
              Next
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

export default QuizFormForteacher;
