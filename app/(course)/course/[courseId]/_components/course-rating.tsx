"use client";
import { CommentCourse } from "@/actions/Etudiant/comment-course";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { set } from "date-fns";
import React from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  courseId?: string;
  readonly?: boolean;
}
const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function CourseRating({ courseId }: RatingProps) {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleRatingChange = (event: any) => {
    setRating(parseFloat(event.target.value));
  };
  const onclick =async () => {
    setIsDisabled(true);
    console.log(rating,"comment"+ comment, courseId);
    
    await CommentCourse(rating, comment, courseId!)
   
    setIsDisabled(false);
    toast.success("Comment added");
    setRating(0);
    setComment("");
   
  };

  return (
    <>
      <hr />

      <div className="flex flex-col gap-y-6 w-full">
        <div className="flex flex-row gap-x-6 items-center">
          <p className=" flex ml-16 text-sm font-semibold">
            You can Rate this coure and keep a comment below to help others
          </p>
          <div className="flex flex-row gap-x-1">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <div key={currentRating} className="flex flex-row space-x-2">
                  <label>
                    <input
                      type="radio"
                      name="rate"
                      value={currentRating}
                      checked={rating === currentRating}
                      onChange={handleRatingChange}
                      className="hidden"
                    />
                    <FaStar
                      className={cn(
                        "text-2xl",
                        rating >= currentRating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      )}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <p> {labels[rating]}</p>
        </div>
        <div className="w-full pl-16 pr-32">
          <Editor
            value={comment}
            onChange={setComment}
            
          />
        </div>
        <div className="flex flex-row justify-end pr-32">
          <Button
            disabled={(rating === 0 || comment === "") || isDisabled}
            className="bg-blue-500 hover:bg-blue-500/80"
            onClick={onclick}
          >
            submit
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
}
