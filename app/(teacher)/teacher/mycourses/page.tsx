import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import React from "react";
import SingleMycoursesPage from "./_components/single-my-courses-page";
import { auth } from "@/auth";

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
  const user=await auth();
  const isaverifiredteacher=user?.user.role=="TEACHER" && user?.user.teacherAccess==true;
  if (!isaverifiredteacher) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <SingleMycoursesPage courses={mycourses} />
    </div>
  );
};
export default Page;
