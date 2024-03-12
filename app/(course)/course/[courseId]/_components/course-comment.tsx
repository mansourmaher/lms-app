"use client";

import { getCourseComments } from "@/actions/course/get-course-comments";
import CommentRating from "./comment-rating";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CourseRating from "./course-rating";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Recycle, Trash } from "lucide-react";

interface CommentListProps {
  comments: Awaited<ReturnType<typeof getCourseComments>> | null;
  courseId: string | undefined;
  userId: string;
}

export default function CommentList({
  comments,
  courseId,
  userId,
}: CommentListProps) {
  const router = useRouter();
  const [isEdititng, setIsEditing] = useState(false);
  const [idCommentToEdit, setIdCommentToEdit] = useState("");

  const isLikes = async (
    isLike: boolean,
    commentId: string,
    courseId: string
  ) => {
    await axios
      .post("/api/reactcomment", {
        isLikes: isLike,
        comment: commentId,
        courseId: courseId,
      })
      .then(() => {
        router.refresh();
      });
  };

  if (!comments) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg font-semibold text-gray-500 dark:text-gray-300">
          No comments yet
        </p>
      </div>
    );
  }
  const toggleEditing = (id: string | undefined) => {
    setIsEditing(!isEdititng);
    setIdCommentToEdit(id!);
  };
  return (
    <>
      <div>
        {comments.map((comment) => (
          <ol
            key={comment.id}
            className="relative border-s border-gray-200 dark:border-gray-700"
          >
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <Avatar className="h-10 w-10 ">
                  <AvatarImage
                    className="rounded-full"
                    src={comment.user?.image || ""}
                    alt={comment.user?.name!}
                  />
                  <AvatarFallback className="uppercase">
                    {comment.user?.name![0]}
                  </AvatarFallback>
                </Avatar>
              </span>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <div className="items-center justify-between mb-3 sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    <div className="flex gap-x-2 items-center">
                      <div>
                        <CommentRating stars={comment.starts!} />
                      </div>
                      <div className="flex gap-x-2">
                        {" "}
                        <p>Commented on</p>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </time>
                  <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                    {comment.user?.name}
                    <a
                      href="#"
                      className="font-semibold text-gray-900 dark:text-white hover:underline"
                    ></a>
                  </div>
                </div>
                <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                  <div>
                    {comment.comment === "" ? (
                      <p className="text-gray-500 dark:text-gray-300">
                        No comment
                      </p>
                    ) : (
                      <h1
                        dangerouslySetInnerHTML={{
                          // @ts-ignore

                          __html: comment.comment,
                        }}
                      />
                    )}
                  </div>
                </div>

                <div></div>

                <div>
                  <div
                    className={`flex ${
                      isEdititng ? "flex-col" : "flex-row justify-between"
                    } items-center ${cn({
                      "mt-3 ml-2 mr-1":
                        isEdititng && idCommentToEdit === comment.id,
                    })}`}
                  >
                    <div>
                      {comment.user?.id === userId ? (
                        <div className="flex gap-x-3 pl-2 pt-4">
                          <Button
                            onClick={() => toggleEditing(comment.id)}
                            variant="ghost"
                            className=""
                            size="sm"
                          >
                            {isEdititng && idCommentToEdit === comment.id ? (
                              "Cancel"
                            ) : (
                              <div className="flex gap-x-2 p-2">
                                <Recycle className="h-4 w-4" />
                              </div>
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <div className="flex gap-x-2 p-2">
                              <Trash className="h-4 w-4" />
                            </div>
                          </Button>
                        </div>
                      ) : null}
                      {isEdititng && idCommentToEdit === comment.id ? (
                        <CourseRating
                          initailComment={comment.comment!}
                          initialRating={comment.starts!}
                          courseId={courseId!}
                          isUpdating={true}
                          commentId={comment.id}
                        />
                      ) : null}
                    </div>
                    {!isEdititng ? (
                      <div className="flex items-center gap-x-2">
                        {/* <div className="flex items-center space-x-2 pt-2">
                          <Button
                            onClick={() => isLikes(true, comment.id, courseId!)}
                            variant="primary"
                            size="sm"
                          >
                            <div className="flex gap-x-1 items-center ">
                              <BiSolidLike className="text-white" size={18} />
                              <p className="text-white">{comment.likes}</p>{" "}
                            </div>
                          </Button>
                        </div> */}
                        <div className="flex items-center space-x-2 pt-2">
                          <Button
                            onClick={() => isLikes(true, comment.id, courseId!)}
                            variant="ghost"
                            size="sm"
                          >
                            <div className="flex gap-x-1 items-center">
                              <BiLike className="" size={18} />
                              <p className="">{comment.likes}</p>{" "}
                            </div>
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2 pt-2">
                          <Button
                            onClick={() =>
                              isLikes(false, comment.id, courseId!)
                            }
                            variant="ghost"
                            size="sm"
                          >
                            <div className="flex gap-x-1 items-center">
                              <BiDislike className="" size={18} />
                              <p className="">{comment.dislikes}</p>{" "}
                            </div>
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          </ol>
        ))}
      </div>
    </>
  );
}
