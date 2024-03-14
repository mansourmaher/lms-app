import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { AlertCircleIcon, Crown, Plus, Timer } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MarkAsCompleteButton from "@/app/(course)/course/[courseId]/_components/markAsCompleteButton";
import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";

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
  hasreport: boolean;
}

export const QuizForm = ({
  chapterId,
  courseId,
  hasreport,
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

  const cureentQuestion = useMemo(() => {
    //@ts-ignore

    setOptions(quiz[questionIndex]?.options[0].options);
    return quiz[questionIndex];
  }, [questionIndex, quiz]);

  const shuffleOptions = () => {
    const optionss = [
      //@ts-ignore
      cureentQuestion.options[0]?.option1,
      //@ts-ignore
      cureentQuestion.options[0]?.option2,
      //@ts-ignore
      cureentQuestion.options[0]?.option3,
    ];
    // Shuffle the options randomly
    const shuffled = options.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  useEffect(() => {
    let interval: any;
    if (cureentQuestion === undefined) return () => clearInterval(interval);

    if (cureentQuestion) {
      shuffleOptions();
    }
    if (cureentQuestion && seccondAvailable === 0) {
      return () => clearInterval(interval);
    }

    interval = setInterval(() => {
      setSeccondAvailable((prev) => prev - 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [cureentQuestion]);

  useEffect(() => {
    if (seccondAvailable === 0 && questionIndex === quiz.length - 1) {
      setDipslayResult(true);

      console.log("quiz ended");
      setQuiz([]);
    } else if (seccondAvailable === 0) {
      setQuestionIndex((prevIndex) =>
        prevIndex < quiz.length - 1 ? prevIndex + 1 : prevIndex
      );
      questionIndex === quiz.length - 1 ? setDipslayResult(true) : null;
      setWrongAnswer(wrongAnswer + 1);
      setIsFalse(true);

      setSeccondAvailable(10);
    }
  }, [seccondAvailable, questionIndex, quiz.length]);

  const getAllQuiz = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${courseId}/chapters/${chapterId}/quizzes`
      );
      setQuiz(response.data);

      //setOptions(response.data[0].options[0].options);

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

  const handleAnswer = (selectedOption: any) => {
    setSeccondAvailable(10);
    //@ts-ignore

    if (selectedOption.option === cureentQuestion.options[0]?.correctOption) {
      setCorrectAnswer(correctAnswer + 1);
      setIsFalse(false);
      toast.success("Correct Answer", {
        icon: "👏",
      });
    } else {
      setWrongAnswer(wrongAnswer + 1);
      setIsFalse(true);
      toast.error("Wrong Answer", {
        icon: "😢",
      });
    }
    setQuestionIndex((prevIndex) =>
      prevIndex < quiz.length ? prevIndex + 1 : prevIndex
    );
    if (questionIndex === quiz.length - 1) {
      setDipslayResult(true);
    }
    setSelectedOption(0);
  };

  return (
    <>
      <Toaster />
      <AlertDialog onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger
          className="flex items-center gap-x-2"
          onClick={handleShowQuiz}
        >
          <Plus size={25} />
          <span>Show Quiz</span>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[40%]">
          <div className="flex flex-row justify-between">
            <AlertDialogTitle>Quizzes for Your Chapter</AlertDialogTitle>
            <div className="flex flex-row gap-3">
              <div>
                <div className="flex flex-row gap-1">
                  <Timer size={25} />
                  <span>{seccondAvailable}/10</span>
                </div>
              </div>
              <div className="flex flex-row gap-1">
                <AlertCircleIcon size={25} />
                <span className="text-red-600">{wrongAnswer}</span>
              </div>
              <div>
                <div className="flex flex-row gap-1">
                  <div>
                    <Crown size={25} className="text-green-600" />
                  </div>
                  <span className="text-green-600">{correctAnswer}</span>
                </div>
                <div></div>
              </div>
            </div>
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
                {shuffledOptions.map((option, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => {
                        setSelectedOption(index + 1);
                        handleAnswer({ option });
                      }}
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

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <Button
              disabled={questionIndex === quiz.length}
              onClick={() => {
                setQuestionIndex((prevIndex) =>
                  prevIndex > 0 ? prevIndex - 1 : prevIndex
                );
              }}
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                setQuestionIndex(0);
                setCorrectAnswer(0);
                setWrongAnswer(0);
                setDipslayResult(false);
                setSeccondAvailable(10);
                handleShowQuiz();
              }}
            >
              Restart
            </Button>
            <Button
              disabled={
                questionIndex === quiz.length ||
                questionIndex === quiz.length - 1
              }
              onClick={() => {
                setQuestionIndex((prevIndex) =>
                  prevIndex < quiz.length - 1 ? prevIndex + 1 : prevIndex
                );
                setWrongAnswer(wrongAnswer + 1);
                setSeccondAvailable(10);
              }}
            >
              Skip
            </Button>

            <MarkAsCompleteButton
              disabled={
                hasreport === false || wrongAnswer > correctAnswer
                  ? true
                  : false || dipslayResult === false
              }
              chapterId={chapterId}
              courseId={courseId}
              mustUploadwork={!hasreport && correctAnswer > wrongAnswer}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

export default QuizForm;
