"use client";
import { Eye } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

interface ChapterSidebarProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}
export const ChapterSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: ChapterSidebarProps) => {
  return (
    <div className="flex pt-6 pl-6">
      <div className="text-sm font-medium ">
        <Link
          href={`/course/${courseId}/chapter/${id}`}
          className="hover:text-blue-500 flex flex-row justify-center gap-3"
        >
          {isLocked ? (
            <LockKeyhole size={16} className="text-gray-500" />
          ) : (
            <Eye size={16} className="text-gray-500" />
          )}
          {label}
        </Link>
      </div>
    </div>
  );
};
