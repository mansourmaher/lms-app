"use client";

import { getTop3Courses } from "@/actions/course/get-top-5-courses";
import { CourseCard } from "@/components/course-card";
import React from "react";

interface Props {
  items: Awaited<ReturnType<typeof getTop3Courses>>;
}

export default function TopThreeCourses({ items }: Props) {
  return (
    <div className="ml-8">
      <p className="text-2xl font-bold mb-8">Recommendation Courses for you</p>
      <span>
        Here are a few courses we think you will liked base on here Rating and
        Reviews
        <br />
        Other student with similar interest have found these courses helpful
      </span>
      <div></div>
    </div>
  );
}
