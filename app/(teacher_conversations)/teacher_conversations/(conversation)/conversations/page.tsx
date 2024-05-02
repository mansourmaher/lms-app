import { GhostIcon } from "lucide-react";
import React from "react";

interface PageProps {
  params: {
    conversationId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex h-full flex-col items-center justify-center gap-2 my-auto">
        <GhostIcon className="h-16 w-16 text-muted-foreground" />
        <div className="text-2xl font-semibold text-muted-foreground">
          No messages yet
        </div>
        <div className="text-sm text-muted-foreground">
          Start a conversation by typing a message
        </div>
      </div>
    </div>
  );
};
export default Page;
