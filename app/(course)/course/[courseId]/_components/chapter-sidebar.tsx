"use client";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Eye, TimerReset } from "lucide-react";
import { LockKeyhole } from "lucide-react";
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
    <div className="flex pt-6 pl-4 pr-2  w-full">
      <div className="text-sm font-medium flex flex-col w-full">
        <Button
          onClick={() => router.push(`/course/${courseId}/chapter/${id}`)}
          size={"lg"}
          className="   bg-white text-gray-800  border-gray-200 hover:border-gray-300 hover:shadow-md hover:bg-slate-200/80 transition-all duration-200 ease-in-out  border-radius-2xl   rounded-full border w-full "
          disabled={isLocked && !isPurchased}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              {isLocked && !isPurchased && (
                <LockKeyhole className="text-gray-500" size={24} />
              )}
              {isLocked && isPurchased && (
                <Eye className="text-sky-500" size={24} />
              )}
              {!isLocked && (
                <Eye className="text-sky-500" size={24} />
              )}
              
              <span className="ml-2">{label}</span>
            </div>

            {isCompleted ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <TimerReset className="text-gray-500" size={20} />
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};
