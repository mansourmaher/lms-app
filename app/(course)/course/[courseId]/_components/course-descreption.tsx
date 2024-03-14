"use client";

import React from "react";
import ReviewProgress from "./course-review-progress";

interface CourseDescreptionProps {
  description: string;
}

export default function CourseDescreption({
  description,
}: CourseDescreptionProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">About this course</h1>
      <p className="text-sm text-muted-foreground mt-1.5  line-clamp-3 h-14 mb-6">
        {description}
      </p>
     
    </div>
  );
}
