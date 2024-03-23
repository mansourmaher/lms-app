"use client";

import React from "react";
import ReviewProgress from "./course-review-progress";
import { getCourseById } from "@/actions/course/get-course-byId";

interface CourseStarsProps {
  course: Awaited<ReturnType<typeof getCourseById>> | null;
}

export default function CourseStars({ course }: CourseStarsProps) {
  return (
    <div>
      <ReviewProgress
        courseId={course?.id!}
        totalReviews={course!.totalReviews!}
        avg={course!.avg}
      />
    </div>
  );
}
