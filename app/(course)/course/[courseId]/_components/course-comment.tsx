"use client";

import { getCourseComments } from "@/actions/course/get-course-comments";
import Image from "next/image";
import CommentRating from "./comment-rating";
import { ReactOnComment } from "@/actions/course/react-comment";

interface CommentListProps {
  comments: Awaited<ReturnType<typeof getCourseComments>> | null;
  courseId: string |undefined;
}

export default function CommentList({ comments, courseId }: CommentListProps) {
  
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
                <Image
                  src={comment.user?.image as string}
                  alt="profile"
                  width={54}
                  height={54}
                  className="rounded-full"
                />
              </span>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <div className="items-center justify-between mb-3 sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    {new Date(comment.createdAt).toLocaleDateString()}
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
                  Hi ya'll! I wanted to share a webinar zeroheight is having
                  regarding how to best measure your design system! This is the
                  second session of our new webinar series on #DesignSystems
                  discussions where we'll be speaking about Measurement.
                </div>
                <div className="flex flex-row ">
                  <CommentRating stars={comment.starts!} />
                </div>

                <div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300">
                        Reply
                      </button>
                      <button className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          ReactOnComment(true, comment.id, courseId!)
                        }
                        className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300"
                      >
                        {comment.likes} Like
                      </button>
                      <button
                        onClick={() =>
                          ReactOnComment(false, comment.id, courseId!)
                        }
                        className="text-xs font-semibold text-gray-500 hover:underline dark:text-gray-300"
                      >
                        {comment.dislikes} Dislike
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
