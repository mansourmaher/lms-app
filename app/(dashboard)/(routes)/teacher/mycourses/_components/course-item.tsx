"use client";
import { totalPurchase } from "@/actions/course/total-purchase";
import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Eye, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseItemProps {
  course: Awaited<ReturnType<typeof teacherGetMyCourses>>[0];
}

export default function CourseItem({ course }: CourseItemProps) {
  const router = useRouter();
  return (
    <div>
      <div className=" space-x-4  p-4">
        <Card
          className="w-[250px] hover:bg-slate-100  cursor-pointer"
          onClick={() => {
            router.push(`mycourses/${course.id}`);
          }}
        >
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-40 h-40 p-2">
                <AvatarImage alt="Profile picture" src={course.imageUrl!} />
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-semibold">{course.title}</p>
                <p className="text-sm text-gray-600">{course.category?.name}</p>
                <p className="text-sm text-gray-600">
                  {course.courseUser.length} Purchases
                </p>
                <div className="flex items-center mt-1 justify-between m-1 gap-x-10">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="text-yellow-400" />
                    <p className="text-sm font-medium ml-1">
                      {course.totalStars !== 0 &&
                        (course.totalStars! / course.totalReviews!).toFixed(2)}
                    </p>
                  </div>
                  <div> {course.totalReviews} Reviews</div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-3">
                <div>
                  <div
                    className="flex space-x-2 items-center cursor-pointer"
                    onClick={() => {
                      router.push(`courses/${course.id}`);
                    }}
                  >
                    <Edit className="mr-2" />
                    Edit
                  </div>
                </div>
                <div>
                  <div
                    className="flex space-x-2 items-center cursor-pointer"
                    onClick={() => {
                      router.push(`mycourses/${course.id}`);
                    }}
                  >
                    <Eye className="mr-2" />
                    {course.courseUser.length} Purchases
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
