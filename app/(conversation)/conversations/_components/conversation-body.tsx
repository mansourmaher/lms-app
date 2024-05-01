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
import { isuserpurchasedthecourseconversationId } from "@/actions/conversation/isuserpurchasedthecourseconversations";
import { pusherClient } from "@/lib/pusher";
import { getTheTeacherFromConversationId } from "@/actions/conversation/gettheteacherfromconversationid";

interface ConversationBodyProps {
  conversationId: string;
  currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
  ispurchased: Awaited<
    ReturnType<typeof isuserpurchasedthecourseconversationId>
  >;
  messages: Awaited<ReturnType<typeof getMessages>>;
  teacher:Awaited<ReturnType<typeof getTheTeacherFromConversationId>>;
}

export function ConversationBody({
  conversationId,
  currentUser,
  ispurchased,
  messages,
  teacher
}: ConversationBodyProps) {
  const [initailmessages, setInitialMessages] =
    React.useState<Awaited<ReturnType<typeof getMessages>>>(messages);
  const [pushermessage, setPusherMessaages] =
    React.useState<Awaited<ReturnType<typeof getMessages>>>(messages);
  useEffect(() => {
    pusherClient.subscribe(`conversation.${conversationId}`);
    const fetchMessages = async () => {
      const messages = await getMessages(conversationId);
      setInitialMessages(messages);
    };
    fetchMessages();

    pusherClient.bind("new-messagesssss", (data: any) => {
      setPusherMessaages((prev) => [data.newMessage, ...prev]);
    });
    return () => {
      pusherClient.unsubscribe(`conversation.${conversationId}`);
    };
  }, [initailmessages, messages, conversationId, pushermessage]);

  return (
    <div className="flex-1 overflow-y-auto">
      {!ispurchased && <UnothorizeState />}
      {initailmessages.length === 0 && <EmptyState />}

      {/*@ts-ignore*/}

      {initailmessages.map((message: any) => (
        <MessageBox
          key={message.id}
          message={message}
          currentUser={currentUser}
          teacher={teacher}
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
function UnothorizeState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <GhostIcon className="h-16 w-16 text-muted-foreground" />
      <div className="text-2xl font-semibold text-muted-foreground">
        You are not authorized to view this conversation
      </div>
      <div className="text-sm text-muted-foreground">
        Please purchase the course to view this conversation
      </div>
    </div>
  );
}
