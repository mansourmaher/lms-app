import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import React from "react";
import MycoursesList from "./my-courses-list";
import Header from "./header";

interface SingleMycoursesPageProps {
  courses: Awaited<ReturnType<typeof teacherGetMyCourses>>;
}

export default function SingleMycoursesPage({
  courses,
}: SingleMycoursesPageProps) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <MycoursesList courses={courses} />
    </div>
  );
}
