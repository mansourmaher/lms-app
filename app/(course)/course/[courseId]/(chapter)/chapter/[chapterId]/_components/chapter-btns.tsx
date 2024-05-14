"use client";

import { getChapterById } from "@/actions/chapter/get-chapter-by-id";
import QuizForm from "@/components/models/quizForm";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { Badge } from "lucide-react";
import React from "react";

interface ChapterButtonsProps {
  chapter: Awaited<ReturnType<typeof getChapterById>>;
  courseId: string;
  hasreport: boolean;
  isCompltedthechapter: boolean;
}

export default function ChapterButtons({
  chapter,
  courseId,
  hasreport,
  isCompltedthechapter,
}: ChapterButtonsProps) {
  const [selected, setSelected] = React.useState(0);

  return (
    <div>
      <div className="ml-8 ">
        <div className="flex flex-row space-x-6 ">
          <Button
            variant={selected === 0 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              setSelected(0);
            }}
          >
            Overview
          </Button>
          {chapter?.toDo && (
            <a href={chapter?.resources[0]?.url!} target="_blank" download>
              <Button
                variant={selected === 1 ? "primary" : "ghost"}
                className="rounded-full  p-4"
                size="sm"
                onClick={() => {
                  selected === 3 ? setSelected(0) : setSelected(3);
                }}
                disabled={!chapter?.toDo}
              >
                {chapter?.toDo ? "Assignment" : "Nothing to do"}
              </Button>
            </a>
          )}
          {!chapter?.toDo && (
            <Button
              variant={selected === 1 ? "primary" : "ghost"}
              className="rounded-full  p-4"
              size="sm"
              onClick={() => {
                selected === 3 ? setSelected(0) : setSelected(3);
              }}
              disabled={!chapter?.toDo}
            >
              {chapter?.toDo ? "Assignment" : "Nothing to do"}
            </Button>
          )}

          {/* <PdfModal
            info={chapter?.resources[0].url!}
            work={chapter?.resources[0].url!}
          /> */}
          <QuizForm
            chapterId={chapter?.id!}
            hasreport={hasreport || !chapter?.toDo!}
            courseId={courseId}
            isCompltedthechapter={isCompltedthechapter}
          />
        </div>
      </div>
    </div>
  );
}
