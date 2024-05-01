import { Message } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/conversation/getcurrentuser";
import { getMessages } from "@/actions/conversation/getmessages";
import { getTheTeacherFromConversationId } from "@/actions/conversation/gettheteacherfromconversationid";
import { Verified } from "lucide-react";
import Link from "next/link";

interface MessageBoxProps {
  message: Awaited<ReturnType<typeof getMessages>>[0];
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
  teacher: Awaited<ReturnType<typeof getTheTeacherFromConversationId>>;
}

export function MessageBox({ message, currentUser, teacher }: MessageBoxProps) {
  const thesenderistheteacher = message.senderId === teacher?.id;
  const isSender = (message: Message) => {
    return message.senderId === currentUser!.user.id;
  };
  return (
    <div className={`flex w-fit my-5 mx-5 ${isSender(message) && "ml-auto"}`}>
      <div className={`flex-shrink-0 px-3  ${isSender(message) && "order-2"}`}>
        <Avatar>
          <AvatarImage
            src={message.sender?.image!}
            alt={message.sender?.name!}
          />
          <AvatarFallback className="uppercase">
            {message?.sender!.name![0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isSender(message)
              ? "text-blue-400  text-right"
              : " text-red-400 text-left"
          }`}
        >
          <span className="flex gap-x-1">
            <span>{message.sender?.name!}</span>
            {thesenderistheteacher && <>teacher</>}
          </span>{" "}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isSender(message) ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>
              {message.body!.includes("http://") ? (
                <Link href={message.body!}>{message.body}</Link>
              ) : (
                message.body
              )}
            </p>
          </div>
          <p className="text-[0.65rem] italic px-2 text-gray-300">
            {new Date(message.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
