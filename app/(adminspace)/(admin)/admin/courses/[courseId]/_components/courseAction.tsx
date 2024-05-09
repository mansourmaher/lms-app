"use client";
import { verifieCourse } from "@/actions/admin/verifie-course";
import { ConfirmModel } from "@/components/models/course-model";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RejectCourse from "../../../courserequest/_components/reject-course";

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
  const acceptCourse = async () => {
    try {
      await verifieCourse(courseId);
      toast.success("Course has been accepted it will display on the website");
      router.push(`/admin/courserequest`);
    } catch (e) {
      toast.error("Error while accepting course");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Button variant="primary" size="sm" onClick={acceptCourse}>
          Accept
        </Button>
        <RejectCourse id={courseId} />
      </div>
    </div>
  );
};

export default CourseAction;
