import React from "react";
import { ConversationHeader } from "../_components/conversation-header";
import { ConversationBody } from "../_components/conversation-body";
import { ConversationForm } from "../_components/conversation-form";
import { auth } from "@/auth";
import { isuserpurchasedthecourseconversationId } from "@/actions/conversation/isuserpurchasedthecourseconversations";
import { getMessages } from "@/actions/conversation/getmessages";
import { getTheTeacherFromConversationId } from "@/actions/conversation/gettheteacherfromconversationid";
import { ConversationsList } from "../_components/conversation_list";
import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { BreadcrumbDemoConversation } from "@/app/(teacher_conversations)/teacher_conversations/(conversation)/conversations/_components/conversation_breadcrumb";

interface PageProps {
  params: {
    conversationId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await auth();
  const ispurchasedthecourse = await isuserpurchasedthecourseconversationId(
    params.conversationId
  );
  const messages = await getMessages(params.conversationId);
  const teacher = await getTheTeacherFromConversationId(params.conversationId);
  const conversation = await getMyconversation();
  return (
    <div className="h-screen bg-secondary">
      {/* <ConversationsList conversations={conversation} /> */}
      <div className="flex h-full flex-col">
        <BreadcrumbDemoConversation isteacher={false} />
        <ConversationHeader conversationId={params.conversationId} />
        <ConversationBody
          conversationId={params.conversationId}
          currentUser={user}
          ispurchased={ispurchasedthecourse}
          messages={messages}
          teacher={teacher}
        />
        <ConversationForm conversationId={params.conversationId} />
      </div>
    </div>
  );
};
export default Page;
