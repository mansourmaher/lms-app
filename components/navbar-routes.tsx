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

interface NavbarRoutesProps {
  notifications: Awaited<ReturnType<typeof getAllNotifications>>;
  userId: string | undefined;
  teachers: Awaited<ReturnType<typeof getTeacherWithCoursesCount>>;
}
export const NavbarRoutes = ({
  notifications,
  userId,
  teachers,
}: NavbarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPalayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname?.includes("/search");
  const isChatPage = pathname?.includes("/chat");

  return (
    <>
      {!isChatPage && (
        <>
          <div className="hidden md:block">
            <div className="flex items-center ">
              {isSearchPage && <SearchInput />}
              <TeacherSearchInput teachers={teachers} />
            </div>
          </div>

          <div className="items-center gap-x-2 ml-auto flex ">
            <UserButton />
            <TeacherNotification
              notifications={notifications}
              userId={userId}
            />

            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
