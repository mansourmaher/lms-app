"use client";

import React from "react";

interface CommentRatingProps {
  stars: number;
}

export default function CommentRating({ stars }: CommentRatingProps) {
  return (
    <div className="flex flex-row ">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 fill-current ${
            i < stars ? "text-yellow-500" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.5 6.5L21 9l-5 4.5L17 22l-5-3.5L7 22l1.5-8.5L3 9l6.5-.5L12 2z" />
        </svg>
      ))}
    </div>
  );
}
