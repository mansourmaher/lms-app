"use client";

import { cn } from "@/lib/utils";
import { MdElectricBolt } from "react-icons/md";

interface PointsProgressProps {
  userProgress: number;
}

export default function PointsProgress({ userProgress }: PointsProgressProps) {
  return (
    <div>
      {/* <div>
              <Progress value={userProgress} max={100} />   
         </div> */}
      <div className="relative size-40">
        <svg
          className="size-full"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-200 dark:text-gray-700"
            strokeWidth="1"
          ></circle>

          <g className="origin-center -rotate-90 transform">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={cn(
                "stroke-current text-blue-400 dark:text-blue-500",
                userProgress >= 100 && "text-green-500"
              )}
              strokeWidth="1"
              strokeDasharray={`${userProgress}, 100`}
            ></circle>
          </g>
        </svg>

        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            <div className="flex flex-col items-center">
              <MdElectricBolt size={80} className="" style={{ color: "#dcde52" }} />
              <span className="text-center text-2xl font-bold text-gray-800 dark:text-white"></span>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
