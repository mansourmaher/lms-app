"use client";
import { ConfirmModel } from "@/components/models/course-model";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CourseActionProps {
  courseId: string;
  isCompleted: boolean;
  isPublished: boolean;
  isAllchpaterOfcourseIsPublished: boolean;
}

const CourseAction = ({
  courseId,
  isCompleted,
  isPublished,
  isAllchpaterOfcourseIsPublished,
}: CourseActionProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted successfully");
      router.push(`/teacher/courses`);
    } catch (error) {
      console.log(error);
    }
  };

  const onPublish = async () => {
    try {
      await axios.patch(
        `/api/courses/${courseId}`,

        { isPublished: !isPublished }
      );
      if (isPublished) {
        toast.success("Course is unpublished successfully");
        router.refresh();

        return;
      }

      toast.success("Course is published successfully");
      confetti.onOpen();
    } catch (error) {
      console.log(error);
    }
  };
  const isReadyToPublish = isCompleted && isAllchpaterOfcourseIsPublished;
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPublish}
          disabled={!isReadyToPublish}
        >
          {isPublished ? "unpublis" : "publish"}
        </Button>
        <ConfirmModel onDelete={onDelete} courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseAction;
