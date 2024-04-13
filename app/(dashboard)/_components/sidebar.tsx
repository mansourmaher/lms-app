"use client";
import { Logo } from "./logo";
import { SideBarRoutes } from "./sidebarroutes";

import { getAllCommunity } from "@/actions/community/get-all-community";
import { useState } from "react";
import { Users } from "lucide-react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@/components/Auth/user-button";
import TeacherNotification from "@/components/Auth/teacher-notifications";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import SheetNotification from "@/components/Auth/notification-sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  community: Awaited<ReturnType<typeof getAllCommunity>>;
}

export default function Sidebar({ community }: SidebarProps) {
  const pathname = usePathname();
  const [isShowCommunity, setIsShowCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<null | string>(
    null
  );
  const isTeacherPage = pathname.includes("/teacher");
  const router = useRouter();
  return (
    <div className="h-full border-r-2 overflow-y-auto bg-white flex flex-col justify-between">
      <div>
        <div className="p-6 border-b mx-2">
          <Logo />
        </div>
        <div className="w-full flex flex-cols pt-8">
          <SideBarRoutes />
        </div>
        {!isTeacherPage && (
          <>
            <div
              className={cn(
                "flex py-2 items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-900 hover:bg-slate-300/20 cursor-pointer",
                isShowCommunity &&
                  "text-sky-700 bg-sky-200/20 hover:bg-sky-200 hover:text-sky-700"
              )}
            >
              <span
                onClick={() => setIsShowCommunity(!isShowCommunity)}
                className="flex justify-between w-full items-center gap-x-2 py-2 pr-4 "
              >
                <div className="flex items-center gap-x-2 ">
                  <Users size={20} />
                  Community
                </div>
                {isShowCommunity ? (
                  <BiDownArrow size={20} />
                ) : (
                  <BiLeftArrow size={20} />
                )}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              {isShowCommunity && (
                <div className="overflow-y-auto h-[380px] flex flex-col    ">
                  {community.map((com) => (
                    <span
                      className={cn(
                        "text-slate-500 p-4 text-sm font-[500] pl-6 transition-all hover:text-slate-900 hover:bg-slate-300/20 cursor-pointer",
                        selectedCommunity === com.id && " text-blue-400"
                      )}
                      key={com.id}
                      onClick={() => {
                        router.push(`/community/${com.id}`);
                        setSelectedCommunity(com.id);
                      }}
                    >
                      # {com.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="p-6 border-t mx-2 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <UserButton />
          <Link href="/teacher/mycourses">
            <Button variant={"primary"}>Teacher 👨‍🏫</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
