import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import React from "react";

interface CourseTargetProps {
  targets: string[];
}

export default function CourseTarget({ targets }: CourseTargetProps) {
  return (
    <>
      <hr className="mx-6" />
      <div className="p-4 rounded-md ">
        <h1 className="text-2xl font-semibold">What you'll learn</h1>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {targets.map((option, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <span className="flex gap-x-2 items-center  max-w-[500px] line-clamp-2 truncate max-h-[40px]">
                <Check className="w-5 h-5 bg-green-400 text-white rounded-full" />
                <span className="text-gray-700 whitespace-normal break-all">
                  {option}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
