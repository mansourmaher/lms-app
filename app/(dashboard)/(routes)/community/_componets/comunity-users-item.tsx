"use client";
import { getPostsInCommunity } from "@/actions/community/get-posts-comunity-id";
import {
  getAllusersInComunityById,
  getUsersInCommunity,
} from "@/actions/community/get-users-in-community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ComunityUserItemProps {
  user: Awaited<ReturnType<typeof getAllusersInComunityById>>[0]["user"];
}

export default function ComunityUserItem({ user }: ComunityUserItemProps) {
  const router = useRouter();
  const handelOnclick = () => {
    router.push(`/teacher/${user.id}`);
  };
  return (
    <div
      className="
    mb-4 w-full hover:bg-slate-300/20 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out p-2
    cursor-pointer
    "
      onClick={() => handelOnclick()}
    >
      <div className="flex items-center  space-x-2">
        <Avatar>
          <AvatarImage
            alt="Abdoulaye"
            src={user.image || "/placeholder.svg?height=32&width=32"}
          />
          <AvatarFallback>{user.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-sm font-semibold">{user.name}</div>

        <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-1">
          {user.role}{" "}
          {user.role === "TEACHER" && (
            <Verified size={16} className="text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
}
