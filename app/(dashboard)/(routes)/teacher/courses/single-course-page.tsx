"use client";

import { getCourses } from "@/actions/course/get-courses";
import {
  getAllCourseIncludeProgresse,
  getCourseIncludeProgresse,
} from "@/actions/teacher/get-all-course-include-progresse";
import React from "react";
import CourseButton from "./_components/course-button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import { columns2 } from "./_components/column2";
import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import { DataTable2 } from "./_components/data-table2";

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
        <DataTable columns={columns} data={courses} />

        <DataTable2 columns={columns2} data={couresesIncludeProgress} />
      </div>
    </div>
  );
}
