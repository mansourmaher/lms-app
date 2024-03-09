"use client";
import React, { useState } from "react";
import MarkAsCompleteButton from "./markAsCompleteButton";
import QuizForm from "@/components/models/quizForm";
import { Chapter } from "@prisma/client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { CompteRendu } from "@/components/models/edtudiant-compte-rendu";

interface EtudiantChapterActionProps {
  courseId: string;
  chapterId: string;
  userId: string;
  chapter: Chapter;
}

export default function EtudiantChapterAction({
  courseId,
  chapterId,
  userId,
  chapter,
}: EtudiantChapterActionProps) {
  const [open, setIsOpen] = useState(false);
  const router = useRouter();

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = chapter.toDo!;
    link.download = "file.pdf"; // Set a custom filename for the downloaded PDF
    link.dispatchEvent(new MouseEvent("click"));
  };

  return (
    <div>
      {/* <MarkAsCompleteButton  chapterId={chapterId} userId={userId}  /> */}
      <QuizForm chapterId={chapterId} courseId={courseId} />
      <button onClick={downloadPdf}>Download PDF</button>
      <CompteRendu  chapterId={chapterId}  />
    </div>
  );
}
