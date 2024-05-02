"use client";
import { Logo } from "./logo";
import { SideBarRoutes } from "./sidebarroutes";

import { getAllCommunity } from "@/actions/community/get-all-community";
import React, { useEffect, useState } from "react";
import { MessageCircle, Users } from "lucide-react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@/components/Auth/user-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { getConversation } from "@/actions/conversation/getconversation";
import { getTheFirstConversation } from "@/actions/conversation/getthefirstconversation";

interface SidebarProps {
  community: Awaited<ReturnType<typeof getAllCommunity>>;
  isverifiedteacher: boolean;
}

export default function Sidebar({
  community,
  isverifiedteacher,
}: SidebarProps) {
  const pathname = usePathname();
  const [isShowCommunity, setIsShowCommunity] = useState(false);
  const [isConversationVisible, setIsConversationVisible] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    null | string
  >(null);
  const [selectedCommunity, setSelectedCommunity] = useState<null | string>(
    null
  );
  const isTeacherPage = pathname.includes("/teacher");

  const [conversations, setConversations] =
    React.useState<Awaited<ReturnType<typeof getMyconversation>>>();
  const [firstconversationId, setFirstconversationId] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    const fetchConversation = async () => {
      const conversations = await getMyconversation();
      const firstconversation = await getTheFirstConversation();
      setFirstconversationId(firstconversation.id);
      setConversations(conversations);
    };
    fetchConversation();
  }, []);
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
          <div className="flex flex-col ">
            <div
              className={cn(
                "flex py-2 items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-900 hover:bg-slate-300/20 cursor-pointer",
                isConversationVisible &&
                  "text-sky-700 bg-sky-200/20 hover:bg-sky-200 hover:text-sky-700"
              )}
            >
              <span
                onClick={() => setIsConversationVisible(!isConversationVisible)}
                className="flex justify-between w-full items-center gap-x-2 py-2 pr-4 "
              >
                <div className="flex items-center gap-x-2 ">
                  <MessageCircle size={20} />
                  Conversations
                </div>
                {isConversationVisible ? (
                  <BiDownArrow size={20} />
                ) : (
                  <BiLeftArrow size={20} />
                )}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              {isConversationVisible && (
                <div className="overflow-y-auto h-[370px] flex flex-col    ">
                  {conversations?.length === 0 ? (
                    <span className="text-slate-500 p-4 text-sm font-[500] pl-6 cursor-pointer">
                      No Conversations
                    </span>
                  ) : (
                    conversations?.map((com) => (
                      <span
                        className={cn(
                          "text-slate-500 p-4 text-sm font-[500] pl-6 transition-all hover:text-slate-900 hover:bg-slate-300/20 cursor-pointer flex flex-row space-x-6",
                          selectedConversation === com.id && " text-blue-400"
                        )}
                        key={com.id}
                        onClick={() => {
                          router.push(`/conversations/${firstconversationId}`);
                          setSelectedConversation(com.id);
                        }}
                      >
                        <span className="flex gap-x-2 items-center">
                          <MessageCircle size={18} className="text-sky-500" />{" "}
                          {com.title}
                        </span>
                      </span>
                    ))
                  )}
                </div>
              )}
            </div>
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
                <div className="overflow-y-auto h-[350px] flex flex-col    ">
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
          </div>
        )}
      </div>
      <div className="p-6 border-t mx-2 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <UserButton />
          {isverifiedteacher && (
            <Link href="/teacher_dashbord">
              <Button variant={"primary"}>Teacher 👨‍🏫</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
