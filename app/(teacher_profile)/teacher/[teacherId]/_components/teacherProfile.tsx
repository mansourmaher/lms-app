"use client";
import { getTeacherById } from "@/actions/teacher/get-teacher-byId";
import { getThePostionOftheteacherById } from "@/actions/teacher/get-the-postion-of-the-teacher";
import CommentRating from "@/app/(course)/course/[courseId]/_components/comment-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { format } from "date-fns";
import { Bell, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface teacherProfileProps {
  teacher: Awaited<ReturnType<typeof getTeacherById>>;
  postion: Awaited<ReturnType<typeof getThePostionOftheteacherById>>;
}

export default function TeacherProfile({
  teacher,
  postion,
}: teacherProfileProps) {
  // const getAge = (date: Date) => {
  //   const today = new Date();
  //   const birthDate = new Date(date);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };
  const [numberofcomments, setnumberofcomments] = useState(5);
  const router = useRouter();

  return (
    <div>
      <div className="w-full py-6 space-y-6">
        <div className="container space-y-4">
          <div className="max-w-5xl mx-auto p-8 bg-white shadow rounded-lg">
            <div className="flex justify-end">
              {postion === 0 && (
                <img
                  src="/firstmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {postion === 1 && (
                <img
                  src="/secondmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {postion === 2 && (
                <img
                  src="/thirdmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {postion > 2 && (
                <img
                  src="/stars.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              <div className="flex flex-col items-center space-y-4 lg:w-1/3">
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height="100"
                  src={teacher?.image || "/placeholder.svg"}
                  style={{
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <h1 className="text-xl font-semibold">{teacher?.name}</h1>
                <p className="text-sm text-gray-500">
                  {teacher?.origin?.region},{teacher?.origin?.label}
                </p>
                <p className="text-sm text-gray-500">
                  Joined in March{" "}
                  {format(new Date(teacher?.createdAt!), "yyyy")}
                  {postion} postion
                </p>
                <p className="text-sm text-gray-500">
                  {teacher.subtitle || "No subtitle available"}
                </p>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    {teacher.github && (
                      <Button variant="outline">
                        <a
                          href={teacher?.github!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="flex items-center space-x-2">
                            <Github size={16} className="text-gray-500" />{" "}
                            <span className="text-gray-500 cursor-pointer">
                              Github
                            </span>
                          </div>
                        </a>
                      </Button>
                    )}
                    {teacher.twitter && (
                      <Button variant="outline">
                        <a
                          href={teacher?.linkedin!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="flex items-center space-x-2">
                            <Linkedin size={16} className="text-gray-500" />{" "}
                            <span className="text-gray-500 cursor-pointer">
                              Linkedin
                            </span>
                          </div>
                        </a>
                      </Button>
                    )}
                    {teacher.linkedin && (
                      <Button variant="outline">
                        <a
                          href={teacher?.twitter!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="flex items-center space-x-2">
                            <Twitter size={16} className="text-gray-500" />{" "}
                            <span className="text-gray-500 cursor-pointer">
                              Twitter
                            </span>
                          </div>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <Button variant="outline">
                  <div className="flex items-center space-x-2">
                    <Bell size={16} className="text-gray-500" />{" "}
                    <span className="text-gray-500">Follow</span>
                  </div>
                </Button>
                <span className="text-gray-500 dark:text-gray-300 text-center">
                  Folllow me on social media to get the latest updates about my
                  courses and my latest projects
                </span>
              </div>

              <div className="flex-grow space-y-8 lg:w-2/3">
                <div className="bg-green-100 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">About me</h2>
                  <p className="text-gray-700">
                    {teacher?.about || "No about me description available"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Specialties</h3>
                    <p className="text-gray-700">
                      {teacher?.filier || "No specialties available"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                    <p className="text-gray-700">
                      {teacher?.totalReview === 0
                        ? "No reviews Yet"
                        : (teacher?.avgReview).toFixed(2) || 0}{" "}
                      (based on {teacher?.totalReview} reviews)
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Students</h3>
                    <p className="text-gray-700">
                      {teacher?.totalTecaherPurchase} students
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Courses</h3>
                    <p className="text-gray-700">
                      {teacher?.totlaCourse} courses
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Some of my patients
                </h3>

                <div className="flex flex-wrap gap-2">
                  {teacher?.patiants?.map((patiant, index) => {
                    return (
                      <Badge key={index} variant="outline" className="p-2">
                        {patiant}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  {" "}
                  <h2 className="text-1xl font-bold">
                    Some of my reviews from students from my courses
                  </h2>
                  <span>
                    I think that the best way to learn is to learn from the
                    experience of others
                  </span>
                </div>

                <div className="mr-16">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setnumberofcomments(numberofcomments + 5)}
                    className="text-blue-600 dark:text-blue-500"
                  >
                    Show More
                  </Button>
                </div>
              </div>

              <div className="grid gap-4  h-96 ">
                {teacher?.reviews?.length === 0 && (
                  <div className="flex items-center justify-center flex-col">
                    <h1 className="text-2xl font-semibold text-gray-500">
                      No reviews available
                    </h1>
                    <span className="text-gray-500">
                      Start learning with me and be the first to review me
                    </span>
                  </div>
                )}
                <ScrollArea className="">
                  {teacher?.reviews
                    ?.slice(0, numberofcomments)
                    .map((review, index) => {
                      return (
                        <ol
                          key={index}
                          className="relative border-s border-gray-200 dark:border-gray-700 mx-8 mt-2"
                        >
                          <li className="mb-10 ms-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                              <Avatar className="h-10 w-10 ">
                                <AvatarImage
                                  className="rounded-full"
                                  src={review.user?.image || "/placeholder.svg"}
                                  alt={review.user?.name!}
                                />
                                <AvatarFallback className="uppercase">
                                  {review.user?.name![0]}
                                </AvatarFallback>
                              </Avatar>
                            </span>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                              <div className="items-center justify-between mb-3 sm:flex">
                                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                                  <div className="flex gap-x-2 items-center">
                                    <div>
                                      <CommentRating stars={review.starts!} />
                                    </div>
                                    <div className="flex gap-x-2">
                                      {" "}
                                      <p>Commented on</p>
                                      {new Date(
                                        review.createdAt!
                                      ).toLocaleDateString()}
                                    </div>
                                  </div>
                                </time>
                                <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                                  {review.user?.name}
                                  <a
                                    href="#"
                                    className="font-semibold text-gray-900 dark:text-white hover:underline"
                                  ></a>
                                </div>
                              </div>
                              <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                <div>
                                  {review.comment === "" ? (
                                    <p className="text-gray-500 dark:text-gray-300">
                                      No comment
                                    </p>
                                  ) : (
                                    <h1
                                      dangerouslySetInnerHTML={{
                                        // @ts-ignore

                                        __html: review.comment,
                                      }}
                                    />
                                  )}
                                </div>
                              </div>

                              <div className="right-0 flex items-center justify-end mt-4">
                                {/* put it in the end*/}
                                <Badge
                                  variant="outline"
                                  className="mr-2 p-2 cursor-pointer"
                                  onClick={() => {
                                    router.push(`/course/${review.course?.id}`);
                                  }}
                                >
                                  {review.course?.title}
                                </Badge>
                              </div>
                            </div>
                          </li>
                        </ol>
                      );
                    })}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
