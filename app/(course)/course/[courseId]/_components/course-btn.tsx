import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { on } from "events";
import React from "react";

interface CourseBtnProps {
  onchange?: () => void;
  isShowComments?: boolean;
}

export default function CourseBtn({
  onchange,
  isShowComments,
}: CourseBtnProps) {
  const btns = [
    {
      title: "Overview",
    },
    {
      title: { isShowComments } ? "Forum Discussions" : "Hide Comments",
    },
    {
      title: "Download Resources",
    },
  ];
  const [selected, setSelected] = React.useState(0);

  return (
    <div>
      <div className="m-8">
        <div className="flex flex-row space-x-6 ">
          <Button
            variant={selected === 0 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              selected === 1 && onchange && onchange();
              setSelected(0);
            }}
          >
            Overview
          </Button>
          <Button
            variant={selected === 1 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              selected === 1 ? setSelected(0) : setSelected(1);
              onchange && onchange();
            }}
          >
            Forum Discussions
          </Button>
          <Button
            variant={selected === 2 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              selected === 1 && onchange && onchange();
              selected === 2 ? setSelected(0) : setSelected(2);
            }}
          >
            Download Resources
          </Button>
        </div>
      </div>
    </div>
  );
}
