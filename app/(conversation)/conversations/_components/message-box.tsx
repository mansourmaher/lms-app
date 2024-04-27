import { Message, User } from "@prisma/client";
import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/actions/conversation/getcurrentuser";
import { getMessages } from "@/actions/conversation/getmessages";

interface MessageBoxProps {
  message: Awaited<ReturnType<typeof getMessages>>[0];
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
}

export function MessageBox({ message, currentUser }: MessageBoxProps) {
  const isSender = (message: Message) => {
    return message.senderId === currentUser!.user.id;
  };
  return (
    <div className={`flex w-fit my-5 mx-5 ${isSender(message) && "ml-auto"}`}>
      <div className={`flex-shrink-0 px-3  ${isSender(message) && "order-2"}`}>
        <Avatar>
          <AvatarImage
            src={message.sender?.image!}
            alt={message.sender.name!}
          />
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
          {message.sender.name!}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isSender(message) ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.body!}</p>
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
