"use client";
import { etudiantgetycourses } from "@/actions/Etudiant/etudiant-get-mycourses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClockIcon, CodepenIcon, ListIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import CourseProgress from "./each-course-progress";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletepurchase } from "@/actions/Etudiant/deletepurchase";

interface CourseStudentItemProps {
  course: Awaited<ReturnType<typeof etudiantgetycourses>>[0];
}

export default function CourseStudentItem({ course }: CourseStudentItemProps) {
  const router = useRouter();
  // const handeldelete = async () => {
  //   await deletepurchase(course.course.id);
  // };
  return (
    <div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 mx-24 mb-24 cursor-pointer"
         onClick={() => router.push(`/course/${course.course.id}`)}
      >
        <div className="flex items-start space-x-6">
          <div className="shrink-0 ">
            <div className="p-2 rounded-full">
              <CourseProgress userProgress={course.progress} />
              {/* <Button onClick={handeldelete} className="mt-4">
                delete
              </Button> */}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {course.course.title}
            </h3>
            <p className="mt-2 text-gray-500  line-clamp-3">
              {course.course.description}
            </p>

            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <ListIcon className="h-5 w-5" />
                <span className="ml-1">
                  {course.course.chapters.length} Leçons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
