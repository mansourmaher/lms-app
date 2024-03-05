"use client";

import { getCourseById } from "@/actions/course/get-course-byId";
import { getCourseComments } from "@/actions/course/get-course-comments";
import React, { useEffect } from "react";
import CourseHedaer from "./course-header";
import CourseImage from "./courseImage";
import CourseBtn from "./course-btn";
import CourseOption from "./course-option";
import TeacherCardCourse from "./teacher-card-course";
import CourseRating from "./course-rating";
import CommentList from "./course-comment";

interface SingleCourseProps {
  course: Awaited<ReturnType<typeof getCourseById>>;
  comments: Awaited<ReturnType<typeof getCourseComments>> | null;
}

export default function SingleCourse({ course, comments }: SingleCourseProps) {
  const [isShowComments, setIsShowComments] = React.useState(false);

  const toggleComments = () => {
    setIsShowComments(!isShowComments);
  };
  return (
    <div>
      <div className="ml-4">
        <CourseHedaer courseName={course?.title!} />
      </div>

      <CourseImage />
      <CourseBtn onchange={toggleComments} isShowComments={isShowComments} />
      <div className="m-8">{course?.description}</div>
      <div className="m-8">
        <CourseOption course={course!} />
      </div>
      <hr className="m-8" />
      <div className="m-8">
        <TeacherCardCourse course={course!} />
      </div>
      <hr className="m-8" />

      <div className="flex flex-row">
        <CourseRating courseId={course?.id!} readonly={false} />
      </div>

      <div className="m-8">
        {comments!.length !== 0 && (
          <CommentList comments={comments} courseId={course?.id} />
        )}
      </div>
    </div>
  );
}
