import Link from "next/link";
import React from "react";

interface CourseHedaerProps {
  courseName: string;
}

export default function CourseHedaer({ courseName }: CourseHedaerProps) {
  return (
    <div className="m-8">
      <div className="flex flex-row justify-between">
        <div>
          <div className="flex text-xl">
            <Link href={`/search`}>
              <div className="flex ">
                <span className="text-blue-500">Courses </span>
              </div>
            </Link>
            <p>
              <span className="mx-2">-{">"}</span>
              {courseName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
