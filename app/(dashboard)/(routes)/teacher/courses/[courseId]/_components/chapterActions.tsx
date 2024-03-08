"use client";
import { ConfirmModel } from "@/components/models/confirm-model";
import { QuizModel } from "@/components/models/quiz-model";
import { QuizForm } from "@/components/models/quizForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash, Trash2Icon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ChapterProps {
  courseId: string;
  chapterId: string;
  disabled: boolean;
  isPublished: boolean;
  isCompleted: boolean;
}

const CharpterAction = ({
  courseId,
  chapterId,
  disabled,
  isPublished,
  isCompleted,
}: ChapterProps) => {
  const router = useRouter();
  const onDelete = async (chapterId: string) => {
    console.log(chapterId);
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted successfully");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const PublishChapter = async () => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        isPublished: !isPublished,
      });
      toast.success("Chapter published successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      {isCompleted && (
        <>
          <Button
            variant="outline"
            onClick={PublishChapter}
            disabled={!isCompleted}
          >
            {isPublished ? "unpublish" : "publish"}
          </Button>
        </>
      )}

      <ConfirmModel chpaterId={chapterId} onDelete={onDelete} />
      <QuizModel chpaterId={chapterId} courseId={courseId} />
      <QuizForm chapterId={chapterId} courseId={courseId} />
    </div>
  );
};

export default CharpterAction;
