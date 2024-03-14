"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, TimerReset } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { Html } from "next/document";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ChapterSidebarProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  isPurchased: boolean;
  description?: string;
}
export const ChapterSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
  isPurchased,
  description,
}: ChapterSidebarProps) => {
  const router = useRouter();

  return (
    <div className="flex pt-6 pl-6 ">
      <div className="text-sm font-medium ">
        <Button
          onClick={() => router.push(`/course/${courseId}/chapter/${id}`)}
          size={"lg"}
          className="  text-left bg-white text-gray-800  border-gray-200 hover:border-gray-300 hover:shadow-md hover:bg-slate-200/80 transition-all duration-200 ease-in-out gap-x-6 border-radius-2xl px-4 py-2 rounded-full border"
          disabled={isLocked && !isPurchased}
        >
          
          <div className="flex gap-x-1 items-center">
            {isLocked && !isPurchased ? (
              <LockKeyhole size={16} className="text-gray-500" />
            ) : (
              <Eye size={16} className="text-gray-500" />
            )}
            <div>
              <span className="ml-2">{label}</span>
            </div>
          </div>

          {isCompleted ? (
            <>
              <CheckCircle size={16} className="text-green-500" />

              <span className="text-green-500 ml-2">Completed</span>
            </>
          ) : (
            <>
              <TimerReset size={16} className="text-yellow-500" />
              <span className="text-yellow-500 ml-2">In Progress</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
