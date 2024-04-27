import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

import { ChevronLeft, MoreHorizontalIcon, Trash2Icon } from "lucide-react";


import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/actions/conversation/getcurrentuser";
import { getConversation } from "@/actions/conversation/getconversation";

interface ConversationHeaderProps {
  conversationId: string;
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
}

export async function ConversationHeader({
  conversationId,
  currentUser,
}: ConversationHeaderProps) {
  const conversation = await getConversation(conversationId);
  console.log("conve"+conversation)
  // const currentUser = await getCurrentUser();
  // const user = conversation!.paticipantsId.find(
  //   (participant:any) => participant.id !== currentUser!.user.id,
  // );
  return (
    <div className="flex w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="block cursor-pointer text-primary transition lg:hidden"
        >
          <ChevronLeft size={25} />
        </Link>
         {/* <Avatar>
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>
            <span>{user?.name![0]}</span>
          </AvatarFallback>
        </Avatar>  */}
        <div className="flex flex-col">
          <div>
            <span className="font-semibold text-foreground">
              {conversation?.title!}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            <span>
              Created on{" "}
               {format(new Date(conversation?.createdAt!), "MMMM dd, yyyy").toString()} 
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size={"icon"}
              className="data-[state=open]:bg-muted"
            >
              <MoreHorizontalIcon className="h-5 w-5 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Block</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <DeleteConversationDialog conversationId={conversationId} /> */}
      </div>
    </div>
  );
}
