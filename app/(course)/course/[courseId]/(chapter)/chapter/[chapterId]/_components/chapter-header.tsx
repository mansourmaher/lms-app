"use client";

import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ChapterHeaderProps {
  courseId: string;
  chapter: any;
  courseName: string;
  nextChapter?: any;
  previewsChapter?: any;
}
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MoveLeft, MoveRight } from "lucide-react";

export default function ChapterHeader({
  courseId,
  chapter,
  courseName,
  nextChapter,
  previewsChapter,
}: ChapterHeaderProps) {
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
  const isLastChapter = nextChapter === null;

  return (
    <div className="flex m-8 justify-between items-center ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/search">Courses</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/course/${courseId}`}>{courseName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-600">
              {chapter?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
    </div>
  );
}
