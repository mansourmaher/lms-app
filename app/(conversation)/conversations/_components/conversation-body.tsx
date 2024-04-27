"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { format, set } from "date-fns";
import { GhostIcon } from "lucide-react";
import { Message } from "@prisma/client";
import { MessageBox } from "./message-box";
import { auth } from "@/auth";
import { getCurrentUser } from "@/actions/conversation/getcurrentuser";
import { getMessages } from "@/actions/conversation/getmessages";

interface ConversationBodyProps {
  conversationId: string;
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
}

export function ConversationBody({
  conversationId,
  currentUser,
}: ConversationBodyProps) {
  const [initailmessages, setInitialMessages] = React.useState<Message[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      const messas=await getMessages(conversationId);
      setInitialMessages(messas);
    };
    fetchMessages();
  }
  , [conversationId]);
  // const chanel = clientPusher.subscribe(`conversation.${conversationId}`);
  // const [newMessage, setNewMessage] = React.useState<Message>();

  // chanel.bind("messages", async (data: Message) => {
  //   setNewMessage(data);
  // });

  const isSender = (message: Message) => {
     return message.senderId === currentUser?.user.id;
  };
  return (
    <div className="flex-1 overflow-y-auto">
      {/* {messages.length === 0 && <EmptyState />} */}
      
      {/*@ts-ignore*/}

      {initailmessages!.map((message: any) => (
        <MessageBox
          key={message.id}
          message={message}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <GhostIcon className="h-16 w-16 text-muted-foreground" />
      <div className="text-2xl font-semibold text-muted-foreground">
        No messages yet
      </div>
      <div className="text-sm text-muted-foreground">
        Start a conversation by typing a message
      </div>
    </div>
  );
}
