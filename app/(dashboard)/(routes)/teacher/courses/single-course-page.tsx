"use client";

import {
  getCourseIncludeProgresse
} from "@/actions/teacher/get-all-course-include-progresse";
import CourseButton from "./_components/course-button";

import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import { DataTable } from "./_components/table-user/data-table";
import { columns } from "./_components/table-user/columns";

interface SingleCoursePageProps {
  courses: Awaited<ReturnType<typeof teacherGetMyCourses>>;
  couresesIncludeProgress: Awaited<
    ReturnType<typeof getCourseIncludeProgresse>
  >;
}

export default function SingleCoursePage({
  courses,
  couresesIncludeProgress,
}: SingleCoursePageProps) {
  return (
    <div className="px-6 py-6">
      <div className="flex justify-end p-8">
        <CourseButton />
      </div>
      <div>
        {/*@ts-ignore*/}
        <DataTable data={couresesIncludeProgress} columns={columns} />
      </div>
    </div>
  );
}
