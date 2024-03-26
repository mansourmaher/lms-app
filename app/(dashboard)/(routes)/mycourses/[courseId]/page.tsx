import { getCourseIncludeProgresse } from "@/actions/teacher/get-all-course-include-progresse";
import React from "react";
import SingleCoursePage from "../../teacher/courses/single-course-page";

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

  return (
    <div>
      <SingleCoursePage couresesIncludeProgress={courseUserIncludeProgress} />
    </div>
  );
};
export default Page;
