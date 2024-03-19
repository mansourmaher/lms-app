"use client";
import React from "react";
import ChapterReport from "./chapter-report";
import ChapterResources from "./chapter-resources";
import { getChapterById } from "@/actions/chapter/get-chapter-by-id";
import { db } from "@/lib/db";
import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import exp from "constants";

interface ChapterPageProps {
  courseId: string;
  chapterId: string;
  nextChapter?: any;
  previewsChapter?: any;
  chapter?: any;
  existingReport: Awaited<ReturnType<typeof hasReportChapter>>;
}

export const ChapterRightSide = ({
  courseId,
  chapterId,
  nextChapter,
  previewsChapter,
  chapter,
  existingReport,
}: ChapterPageProps) => {
  const isLastChapter = nextChapter === null;
  const router = useRouter();

  const handelNextChapter = () => {
    if (nextChapter) {
      router.push(`/course/${courseId}/chapter/${nextChapter.id}`);
    }
  };
  const handelPreviewsChapter = () => {
    if (previewsChapter) {
      router.push(`/course/${courseId}/chapter/${previewsChapter.id}`);
    }
  };

  return (
    <div className="h-full border flex flex-col overflow-y-auto shadow-sm bg-red-500">
      <div>
        <div className="flex gap-x-6 ">
          <div className="flex ">
            {chapter?.position !== 1 && (
              <Button
                variant="ghost"
                className="flex text-blue-500 hover:text-blue-500/80 rounded-full  p-4"
                onClick={handelPreviewsChapter}
                disabled={previewsChapter?.isFree === false}
                size="sm"
              >
                <MoveLeft className="text-2xl mx-2" />
                <span>{previewsChapter?.title} </span>
              </Button>
            )}
          </div>
          <div className="flex">
            {!isLastChapter && (
              <Button
                variant="ghost"
                className="flex text-blue-500 hover:text-blue-500/80 rounded-full  p-4"
                onClick={handelNextChapter}
                disabled={nextChapter?.isFree === false}
                size="sm"
              >
                <span className="">{nextChapter.title} </span>
                <MoveRight className="text-2xl mx-2 " />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 w-full  pl-2">
        <ChapterReport
          chapterId={chapterId}
          courseId={courseId}
          existingReport={existingReport}
        />
        <div>
          <ChapterResources resources={chapter?.resources!} />
        </div>
      </div>
    </div>
  );
};
