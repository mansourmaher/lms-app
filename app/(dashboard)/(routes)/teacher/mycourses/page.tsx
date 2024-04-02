import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import React from "react";
import SingleMycoursesPage from "./_components/single-my-courses-page";

const Page = async () => {
  const mycourses = await teacherGetMyCourses();
  return (
    <div>
      <SingleMycoursesPage courses={mycourses} />
    </div>
  );
};
export default Page;
