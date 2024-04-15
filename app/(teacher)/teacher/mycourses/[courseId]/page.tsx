import { getCourseIncludeProgresse } from "@/actions/teacher/get-all-course-include-progresse";
import React from "react";
import SingleCoursePage from "../../courses/single-course-page";
import { auth } from "@/auth";

const Page = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const courseUserIncludeProgress = await getCourseIncludeProgresse(
    params.courseId
  );
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  if (!isaverifiredteacher) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <SingleCoursePage couresesIncludeProgress={courseUserIncludeProgress} />
    </div>
  );
};
export default Page;
