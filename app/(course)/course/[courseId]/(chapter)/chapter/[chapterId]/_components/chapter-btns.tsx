"use client";

import { getChapterById } from "@/actions/chapter/get-chapter-by-id";
import PdfModal from "@/app/(dashboard)/(routes)/teacher/check/_components/pdf-modal";
import QuizForm from "@/components/models/quizForm";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import React from "react";

interface ChapterButtonsProps {
  chapter: Awaited<ReturnType<typeof getChapterById>>;
  courseId: string;
  hasreport: boolean;
}

export default function ChapterButtons({
  chapter,
  courseId,
  hasreport,
}: ChapterButtonsProps) {
  const [selected, setSelected] = React.useState(0);

  return (
    <div>
      <div className="ml-8">
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
          <Button
            variant={selected === 1 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              selected === 1 ? setSelected(0) : setSelected(1);
            }}
          >
            Download Resources
          </Button>
          <Button
            variant={selected === 2 ? "primary" : "ghost"}
            className="rounded-full  p-4"
            size="sm"
            onClick={() => {
              selected === 2 ? setSelected(0) : setSelected(2);
            }}
          >
            Download the work
          </Button>
          <a href={chapter?.resources[0]?.url!} target="_blank" download>
            <Button
              variant="primary"
              className="rounded-full  p-4"
              size="sm"
              onClick={() => {
                selected === 3 ? setSelected(0) : setSelected(3);
              }}
            >
              Download the work
            </Button>
          </a>

          {/* <PdfModal
            info={chapter?.resources[0].url!}
            work={chapter?.resources[0].url!}
          /> */}

          <QuizForm
            chapterId={chapter?.id!}
            hasreport={hasreport}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
}
