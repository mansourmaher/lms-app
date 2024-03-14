"use client";

import { CiVideoOn } from "react-icons/ci";
import { getCourseById } from "@/actions/course/get-course-byId";
import { Signal, Users } from "lucide-react";

interface CourseOptionProps {
  course: Awaited<ReturnType<typeof getCourseById>> | null;
  courseTotalPurchased: number;
}

export default function CourseOption({
  course,
  courseTotalPurchased,
}: CourseOptionProps) {
  return (
    <div>
      <hr className="mx-8" />
      <div className="flex flex-row justify-between items-center mx-16 my-8">
        <div className="flex flex-row items-end">
          <div className="flex flex-col items-start space-y-2">
            <div>
              <span className="text-lg font-semibold">Skill Level</span>
            </div>
            <div className="rounded-full border p-3 border-blue-500">
              <Signal size={30} className="text-blue-600" />
            </div>
          </div>
          <div>
            <p>
              <span className="">beginner</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-end">
          <div className="flex flex-col items-start space-y-2">
            <div>
              <span className="text-lg font-semibold">Lessons</span>
            </div>
            <div className="rounded-full border p-3 border-blue-500">
              <CiVideoOn size={30} className="text-blue-600" />
            </div>
          </div>
          <div>
            <p>
              <span className="">{course?.chapters?.length} Lessons</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-end">
          <div className="flex flex-col items-start space-y-2">
            <div>
              <span className="text-lg font-semibold">Purchases</span>
            </div>
            <div className="rounded-full border p-3 border-blue-500">
              <Users size={30} className="text-blue-600" />
            </div>
          </div>
          <div>
            <div>
              <p>
                <span className="">{courseTotalPurchased}</span>
                {courseTotalPurchased === 1 ? " Purchase" : " Purchases"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
