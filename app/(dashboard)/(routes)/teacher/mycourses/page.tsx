import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import React from "react";
import SingleMycoursesPage from "./_components/single-my-courses-page";

interface getCoursesParams {
  title?: string;
  category?: string;
  teacher?: string;
  level?: string;
}

interface SearchPageProps {
  searchParams: getCoursesParams;
}
const Page = async ({ searchParams }: SearchPageProps) => {
  const mycourses = await teacherGetMyCourses({
    title: searchParams.title!,
    category: searchParams.category!,
    teacher: searchParams.teacher!,
    level: searchParams.level!,
  });
  return (
    <div>
      <SingleMycoursesPage courses={mycourses} />
    </div>
  );
};
export default Page;
