import { Button } from "@/components/ui/button";
import React from "react";

interface CourseBtnProps {
  onchange?: () => void;
  isShowComments?: boolean;
}

export default function CourseBtn(
  { onchange, isShowComments }: CourseBtnProps,

) {
  const btns = [
    {
      title: "Overview",
    },
    {
      title: "Forum Discussions",
    },
    {
      title: "Download Resources",
    },
  ];
  return (
    <div>
      <div className="m-8">
        <div className="flex flex-row space-x-6 ">
          {btns.map((btn, index) => (
            <div key={index}>
              <Button
                className="text-white
                bg-slate-400 p-4 rounded-full  "
                size="sm"
              >
                {btn.title}
              </Button>
            </div>
          ))}
          <Button
            className="text-white bg-slate-400 p-4 rounded-full"
            size="sm"
            onClick={onchange}
            >
            {isShowComments ? "Hide" : "Show"} Comments
            </Button>
        </div>
      </div>
    </div>
  );
}
