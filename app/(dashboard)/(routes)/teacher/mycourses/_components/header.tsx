import { getTeacherById } from "@/actions/teacher/get-teacher-byId";
import { getPercentageOfPlusque3StarsByteacher } from "@/actions/teacher/percentage-of-plusque3stars";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import React from "react";

const Header = async () => {
  const teacher = await auth();
  const teacherId = teacher?.user?.id;
  const teacherStats = await getTeacherById(teacherId!);

  const percentage = await getPercentageOfPlusque3StarsByteacher();

  return (
    <div className="m-8">
      <div className="flex flex-col space-y-2">
        <span className="text-2xl font-semibold">
          Hey {teacherStats?.name}!
        </span>
        <span className="text-gray-500">Welcome back to your courses List</span>
        {percentage > 50 ? (
          <Badge variant={"green"} className="p-3 flex justify-center">
            <span className="text-white text-sm">
              You are doing great! Keep up the good work{" "}
              {teacherStats?.totalTecaherPurchase} students have purchased your
              courses {Math.round(percentage)} % of your students Like you
              
            </span>
          </Badge>
        ) : (
          <Badge variant={"destructive"} className="p-3 flex justify-center">
            <span className="text-white text-sm">
              You need to improve your content!{" "}
              {teacherStats?.totalTecaherPurchase} students have purchased your
              courses {Math.round(percentage)} % of your students Like you
              
            </span>
          </Badge>
        )}
      </div>
    </div>
  );
};
export default Header;
