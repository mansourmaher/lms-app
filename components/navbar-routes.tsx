"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { UserButton } from "./Auth/user-button";
import { SearchInput } from "./search_input";

import { Notifications } from "@prisma/client";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import TeacherNotification from "./Auth/teacher-notifications";

interface NavbarRoutesProps {
  notifications: Awaited<ReturnType<typeof getAllNotifications>>;
  userId:string |undefined
}
export const NavbarRoutes = ({ notifications,userId }: NavbarRoutesProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPalayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname?.includes("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="items-center gap-x-2 ml-auto flex ">
        <UserButton />
        <TeacherNotification notifications={notifications} userId={userId} />

        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      </div>
    </>
  );
};
