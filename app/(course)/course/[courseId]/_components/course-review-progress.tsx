"use client";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import React from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  courseId: string | undefined;
  avg?: number;
  totalReviews?: number;
  isForCard?: boolean;
}

export default function ReviewProgress({
  courseId,
  avg,
  totalReviews,
  isForCard,
}: Props) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger className="cursor-pointer w-auto " asChild>
          <div
            className={cn(
              "flex  items-center",
              isForCard ? "justify-between" : "justify-start"
            )}
          >
            <div className="flex mt-4 sm:flex-col ">
              <div className="flex   mb-4 ">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <div
                      key={currentRating}
                      className="flex flex-row space-x-2"
                    >
                      <label>
                        <input
                          type="radio"
                          name="rate"
                          value={currentRating}
                          checked={avg === currentRating}
                          readOnly
                          className="hidden"
                        />
                        <FaStar
                          className={cn(
                            "text-2xl",
                            avg! >= currentRating
                              ? "text-yellow-400"
                              : "text-gray-400"
                          )}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>

              <p>{Number.isNaN(avg) ? null : <> ({avg?.toFixed(1)})</>}</p>
            </div>

            <div>
              <p> ({totalReviews} Review) </p>
            </div>
          </div>
        </HoverCardTrigger>
      </HoverCard>
    </>
  );
}
