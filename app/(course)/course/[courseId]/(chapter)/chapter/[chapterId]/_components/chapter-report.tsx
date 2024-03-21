"use client";

import { hasReportChapter } from "@/actions/Etudiant/has-report-chapter";
import { removeReportChapter } from "@/actions/report/remove-report";
import { CompteRendu } from "@/components/models/edtudiant-compte-rendu";
import QuizForm from "@/components/models/quizForm";
import SanitizeHTML from "@/components/sanitize-html";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ChapterOptionProps {
  chapterId: string;
  courseId: string;
  existingReport: Awaited<ReturnType<typeof hasReportChapter>>;
}

export default function ChapterReport({
  chapterId,
  courseId,
  existingReport,
}: ChapterOptionProps) {
  const router = useRouter();
  const [workUrl, setWorkUrl] = React.useState("");

  useEffect(() => {
    if (workUrl) {
      router.refresh();
    }
  }, [workUrl]);
  const handelremovereport = async (id: string) => {
    await removeReportChapter(id);
    router.refresh();
  };
  return (
    <div className="">
      <div className="max-w-sm   bg-white rounded-lg shadow-md">
        <div className="flex justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Votre devoir</h3>
          <span className="text-sm font-semibold text-blue-600">
            {existingReport ? "Remis" : null}
          </span>
        </div>
        <div className="p-5">
          {existingReport && (
            <div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold">Devoire</span>
                <div className="flex justify-between items-center gap-x-1">
                  <span className="text-sm font-semibold text-blue-600">
                    <a href={existingReport.workUrl!} target="_blank">
                      {existingReport.work} {"  "}
                    </a>
                  </span>
                  <div>
                    <X
                      size={18}
                      onClick={() => handelremovereport(existingReport.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" py-4 border-t align-middle text-center">
          <div className="">
            <CompteRendu
              chapterId={chapterId}
              courseId={courseId}
              value={workUrl}
              isUpdating={existingReport ? true : false}
              onChange={(value) => setWorkUrl(value)}
            />
          </div>
        </div>
        {existingReport && !existingReport.note && (
          <div className="px-5 py-4 border-t">
            <span className="text-sm font-semibo">
              Wait for the teacher to correct your work
            </span>
          </div>
        )}
        {!existingReport && (
          <div className="px-5 py-4 border-t">
            <span className="text-sm font-semibo">
              You have not yet submitted your work
            </span>
          </div>
        )}
        {existingReport && existingReport.note && (
          <div className="px-5 py-4 border-t">
            <span>
              {existingReport.grade && existingReport.grade > 15 ? (
                <span className="text-sm font-semibold text-green-600">
                  Note: {existingReport.grade} / 20 {"  "} Good job
                </span>
              ) : (
                <span className="text-sm font-semibold text-red-600">
                  Note: {existingReport.grade} / 20 {"  "} You can do better
                </span>
              )}
            </span>
            <ScrollArea className="h-40">
              <div
                dangerouslySetInnerHTML={{ __html: existingReport.note }}
              ></div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
