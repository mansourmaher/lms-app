"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton } from "./Auth/user-button";
import { SearchInput } from "./search_input";

import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import TeacherNotification from "./Auth/teacher-notifications";
import TeacherSearchInput from "./teacher-search-input";
import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import CoursesSearchInput from "./models/courses-search-input";
import { getCoursesNameAndImage } from "@/actions/course/get-courses-image-name";
import { Search } from "lucide-react";
import SheetNotification from "./Auth/notification-sheet";

interface NavbarRoutesProps {
  notifications: Awaited<ReturnType<typeof getAllNotifications>>;
  userId: string | undefined;
  teachers: Awaited<ReturnType<typeof getTeacherWithCoursesCount>>;
  courses: Awaited<ReturnType<typeof getCoursesNameAndImage>>;
}
export const NavbarRoutes = ({
  notifications,
  userId,
  teachers,
  courses,
}: NavbarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPalayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname?.includes("/search");
  const isChatPage = pathname?.includes("/community");

  return (
    <>
      {!isChatPage && (
        <>
          <div className="hidden md:block">
            <div className="flex items-center rounded-full bg-slate-100 focus-visible:ring-slate-200  ">
              <Search className="text-slate-500 ml-8" />

              <TeacherSearchInput teachers={teachers} />
              <div className="mr-8">||</div>
              <CoursesSearchInput courses={courses} />
            </div>
          </div>
        </>
      )}
      <div className="items-center gap-x-2 ml-auto flex mx-4">
        <SheetNotification notifications={notifications} userId={userId} />
      </div>
    </>
  );
};
