import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { ConversationForm } from "../_components/conversation-form";
import { BreadcrumbDemoConversation } from "@/app/(teacher_conversations)/teacher_conversations/(conversation)/conversations/_components/conversation_breadcrumb";

function Loading() {
  return (
    <div>
      <BreadcrumbDemoConversation isteacher={false} />

      <main className="flex h-full w-full flex-col  gap-6 overflow-y-auto overflow-x-hidden ">
        <div className="border-b p-3">
          <div className="h-10 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
        </div>
        <div className="bg-muted">
          <div className="m-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="mb-4 ">
                <div className="flex justify-end animate-pulse">
                  <div className="flex items-start gap-2.5 ">
                    <Skeleton className="flex  w-[480px] h-10  flex-col gap-1 " />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
                <div className="flex items start animate-pulse">
                  <div className="flex items-start gap-2.5">
                    <Skeleton className="flex  w-[480px] h-10  flex-col gap-1 " />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ConversationForm conversationId="1" />
      </main>
    </div>
  );
}

export default Loading;
