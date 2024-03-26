import { getTeacherById } from "@/actions/teacher/get-teacher-byId";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Header = async () => {
  const teacher = await auth();
  const teacherId = teacher?.user?.id;
  const teacherStats = await getTeacherById(teacherId!);

  const getPercentageOfavgPlusque3 = (total: number, avg: number) => {
    return (avg * 20).toFixed(0);
  };
  return (
    <div className="m-8">
      <div className="flex flex-col space-y-2">
        <span className="text-2xl font-semibold">
          Hey {teacherStats?.name}!
        </span>
        <span className="text-gray-500">Welcome back to your courses List</span>

        <Badge
          variant={teacherStats?.avgReview! >= 3 ? "green" : "destructive"}
          className="p-3  flex justify-center "
        >
          <span className="text-white text-sm">
            You are doing great! Keep up the good work {" "}
            {teacherStats?.totalTecaherPurchase} {" "} students have purchased your
            courses {" "}
            {getPercentageOfavgPlusque3(
              teacherStats?.totalReview,
              teacherStats?.avgReview
            )}{" "}
            % of your students Like you content
          </span>
        </Badge>
      </div>
    </div>
  );
};
export default Header;
