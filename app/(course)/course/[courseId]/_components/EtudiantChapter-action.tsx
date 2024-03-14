"use client";
import React, { useEffect, useState } from "react";
import MarkAsCompleteButton from "./markAsCompleteButton";
import QuizForm from "@/components/models/quizForm";
import { Chapter } from "@prisma/client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { CompteRendu } from "@/components/models/edtudiant-compte-rendu";
import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";

interface EtudiantChapterActionProps {
  courseId: string;
  chapterId: string;
  userId: string;
  chapter: Chapter;
  existingReport: Awaited<ReturnType<typeof hasReportChapter>>;
}

export default function EtudiantChapterAction({
  courseId,
  chapterId,
  userId,
  chapter,
  existingReport,
}: EtudiantChapterActionProps) {
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  const [report, setReport] =
    useState<Awaited<ReturnType<typeof hasReportChapter>>>();
  // const downloadPdf = () => {
  //   const link = document.createElement("a");
  //   link.href = chapter.toDo!;
  //   link.download = "file.pdf"; // Set a custom filename for the downloaded PDF
  //   link.dispatchEvent(new MouseEvent("click"));
  // };

  useEffect(() => {
    const fetchReport = async () => {
      const report = await hasReportChapter(chapterId);
      setReport(report);
    };
  }, []);

  return (
    <div>
      {/* <MarkAsCompleteButton  chapterId={chapterId} userId={userId}  /> */}
      <QuizForm chapterId={chapterId} courseId={courseId} hasreport={false} />
      {/* <button onClick={downloadPdf}>Download PDF</button> */}
      {existingReport && !existingReport.note && <p>Upcoming</p>}
      {existingReport && existingReport.note && (
        <div
          dangerouslySetInnerHTML={{
            // @ts-ignore

            __html: existingReport.note,
          }}
        />
      )}

      {!existingReport && (
        <CompteRendu chapterId={chapterId} courseId={courseId} />
      )}
    </div>
  );
}
