import Link from "next/link";

import { ChevronLeft, MoreHorizontalIcon } from "lucide-react";

import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getConversation } from "@/actions/conversation/getconversation";
import FetchtheoptionData from "./conversation_option";

interface ConversationHeaderProps {
  conversationId: string;
}

export async function ConversationHeader({
  conversationId,
}: ConversationHeaderProps) {
  const conversation = await getConversation(conversationId);

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
              {format(
                new Date(conversation?.createdAt!),
                "MMMM dd, yyyy"
              ).toString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FetchtheoptionData conversationId={conversation!.id} />

        {/* <DeleteConversationDialog conversationId={conversationId} /> */}
      </div>
    </div>
  );
}
