"use client";

import { getCourseComments } from "@/actions/course/get-course-comments";
import CommentRating from "./comment-rating";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentListProps {
  comments: Awaited<ReturnType<typeof getCourseComments>> | null;
  courseId: string | undefined;
}

export default function CommentList({ comments, courseId }: CommentListProps) {
  const router = useRouter();

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
                    <div className="flex gap-x-2">
                      <p>Commented on</p>
                      {new Date(comment.createdAt).toLocaleDateString()}
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
                <div className="flex flex-row ">
                  <CommentRating stars={comment.starts!} />
                </div>

                <div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2"></div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => isLikes(true, comment.id, courseId!)}
                        className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300"
                      >
                        <div className="flex gap-x-1 items-center ">
                          <BiSolidLike className="text-blue-500" size={18} />
                          <p className="text-blue-500">{comment.likes}</p>{" "}
                        </div>
                      </button>
                      <button
                        onClick={() => isLikes(false, comment.id, courseId!)}
                        className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300"
                      >
                        <div className="flex gap-x-1 items-center">
                          <BiDislike className="text-red-500" size={18} />
                          <p className="text-red-500">
                            {comment.dislikes}
                          </p>{" "}
                        </div>
                      </button>
                    </div>
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
