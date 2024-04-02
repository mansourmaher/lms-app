import { etudiantgetycourses } from "@/actions/Etudiant/etudiant-get-mycourses";
import React from "react";
import CourseStudentItem from "./course-student-item";

const CourseStudentList = async () => {
  const mycourses = await etudiantgetycourses();

  return (
    <div>
      {mycourses.map((course) => (
        <div key={course.id}>
          <CourseStudentItem course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseStudentList;
