"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { ChapterRightSide } from "./chapter-right-side";
import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";

interface ChapterSheetProps {
  courseId: string;
  chapterId: string;
  chapter: any;
  nextChapter: any;
  previewsChapter: any;
  handelNextChapter: () => void;
  handelPreviewsChapter: () => void;
  isLastChapter: boolean;
  existingReport: Awaited<ReturnType<typeof hasReportChapter>>;
}

export default function ChapterSheet({
  courseId,
  chapterId,
  chapter,
  nextChapter,
  previewsChapter,
  handelNextChapter,
  handelPreviewsChapter,
  isLastChapter,
  existingReport,
}: ChapterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>opppp</Button>
      </SheetTrigger>
      <SheetContent side="right">
        {/* <div>
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
        </div> */}
        <ChapterRightSide
          courseId={courseId}
          chapterId={chapterId}
          nextChapter={nextChapter}
          previewsChapter={previewsChapter}
          chapter={chapter}
          existingReport={existingReport}
        />
      </SheetContent>
    </Sheet>
  );
}
