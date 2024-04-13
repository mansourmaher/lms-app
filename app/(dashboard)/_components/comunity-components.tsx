"use client";
import { getAllCommunity } from "@/actions/community/get-all-community";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiDownArrow, BiLeftArrow } from "react-icons/bi";

interface ComunityComponentsProps {
  community: Awaited<ReturnType<typeof getAllCommunity>>;
}
export default function ComunityComponents({
  community,
}: ComunityComponentsProps) {
  const [isShowCommunity, setIsShowCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<null | string>(
    null
  );
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2">
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
    </div>
  );
}
