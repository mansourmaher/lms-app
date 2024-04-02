import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import React from "react";
import CourseItem from "./course-item";

interface MycoursesListProps {
  courses: Awaited<ReturnType<typeof teacherGetMyCourses>>;
}

export default function MycoursesList({ courses }: MycoursesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
      {courses.map((course) => (
        <div key={course.id}>
          <CourseItem course={course} />
        </div>
      ))}
    </div>
  );
}
