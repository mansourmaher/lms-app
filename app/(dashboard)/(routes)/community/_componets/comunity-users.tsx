import { getPostsInCommunity } from "@/actions/community/get-posts-comunity-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import ComunityUserItem from "./comunity-users-item";
import { getAllusersInComunityById } from "@/actions/community/get-users-in-community";

interface ComunityUserProps {
  communityId: string;
}

export const ComunityUser = async ({ communityId }: ComunityUserProps) => {
  const users = await getAllusersInComunityById(communityId);

  return (
    <div className="hidden lg:block w-96 p-6 ">
      <div className="mb-4 text-sm font-semibold">Members - {users.length}</div>
      <div className="h-[580px] overflow-y-auto ">
        {users.map((user) => (
          <div key={user.id} className="flex  ">
            <ComunityUserItem user={user.user} />
          </div>
        ))}
      </div>
    </div>
  );
};
