"use client";

import { Course } from "@prisma/client";
import React from "react";
import { FcRating, FcStatistics } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";
import { CiVideoOn } from "react-icons/ci";
import { TbCategory, TbCategoryMinus, TbEyeSearch } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import TeacherCardCourse from "./teacher-card-course";
import { get } from "http";
import { getCoursesCountByTeacher } from "@/actions/course/get-courses-count-by-teacher";
import { FaEyeSlash } from "react-icons/fa";
import ReviewProgress from "./course-review-progress";
import { getCourseById } from "@/actions/course/get-course-byId";

interface CourseOptionProps {
  course: Awaited<ReturnType<typeof getCourseById>> | null;
}

export default function CourseOption({ course }: CourseOptionProps) {
  return (
    <div>
      <hr />
      <div className="flex flex-row justify-between items-center m-6 mr-16">
        <div className="mb-6">
          <div className="mb-3 text-sm font-semibold">Skill Level</div>
          <div className="flex flex-row items-center gap-6">
            <IoIosStats size={40} className="text-blue-400 " />

            <div>Beginner</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-3 text-sm font-semibold">Skill Level</div>
          <div className="flex flex-row items-center gap-6">
            <div>
              <CiVideoOn size={40} className="text-blue-400" />
            </div>
            <div>Leesons</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-3 text-sm font-semibold">Skill Level</div>
          <div className="flex flex-row items-center gap-6">
            <FcStatistics size={40} className="text-blue-400" />

            <ReviewProgress
              courseId={course?.id!}
              totalReviews={course!.totalReviews}
              avg={course!.avg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
