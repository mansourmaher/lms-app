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
    <div className="flex m-8 justify-between ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/course/${courseId}`}>
              {courseName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="text-blue-600">
              {chapter?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-x-6 ">
        <div className="flex ">
          {chapter?.position !== 1 && (
            <Button
              variant={"outline"}
              className="flex hover:text-blue-500/80"
              onClick={handelPreviewsChapter}
            >
              <FaArrowLeft className="text-2xl mx-2" />
              <p>Previews</p>
            </Button>
          )}
        </div>
        <div className="flex">
          {!isLastChapter && (
            <Button
              variant={"outline"}
              className="flex hover:text-blue-500/80"
              onClick={handelNextChapter}
            >
              <p className="">Next </p>
              <FaArrowRight className="text-2xl mx-2 " />
            </Button>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}
