"use client";

import { getCourseById } from "@/actions/course/get-course-byId";
import { getCourseComments } from "@/actions/course/get-course-comments";
import React, { useEffect, useState } from "react";
import CourseHedaer from "./course-header";
import CourseImage from "./courseImage";
import CourseBtn from "./course-btn";
import CourseOption from "./course-option";
import TeacherCardCourse from "./teacher-card-course";
import CourseRating from "./course-rating";
import CommentList from "./course-comment";
import CourseDescreption from "./course-descreption";
import CourseStars from "./course-stars";

interface SingleCourseProps {
  course: Awaited<ReturnType<typeof getCourseById>>;
  comments: Awaited<ReturnType<typeof getCourseComments>> | null;
  userId: string;
  isuserPurchasedthiscourse: boolean;
  courseTotalPurchased: number;
}

export default function SingleCourse({
  course,
  comments,
  userId,
  isuserPurchasedthiscourse,
  courseTotalPurchased,
}: SingleCourseProps) {
  const [showcomments, setShowcomments] = useState(false);
  const handelComment = () => {
    setShowcomments(!showcomments);
  };
  return (
    <div>
      <div className="m-8">
        <CourseHedaer courseName={course?.title!} />
      </div>
      <div className="m-8">
        <CourseImage img={course.imageUrl!} />
      </div>
      <div className="m-8">
        <CourseBtn onchange={handelComment} isShowComments={showcomments} />
      </div>

      <div className="mx-16">
        <CourseDescreption description={course.description!} />
      </div>
      <div className="mx-16">
        <CourseStars course={course!} />
      </div>
      <div className="mx-8">
        <CourseOption
          course={course!}
          courseTotalPurchased={courseTotalPurchased}
        />
      </div>
      <hr className="mx-16" />
      <div className="mx-16">
        <TeacherCardCourse course={course!} />
      </div>
      <hr className="mx-16" />

      <div className="mt-8 mx-24">
        {showcomments && comments!.length !== 0 && (
          <CommentList
            comments={comments}
            courseId={course?.id}
            userId={userId}
          />
        )}
      </div>
      <hr className="mx-16" />
      {isuserPurchasedthiscourse && (
        <div className=" mt-8 ml-8">
          <CourseRating courseId={course?.id!} readonly={false} />
        </div>
      )}
    </div>
  );
}
