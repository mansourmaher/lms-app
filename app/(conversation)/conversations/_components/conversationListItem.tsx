"use client";

import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { useRouter } from "next/navigation";

interface UserBoxProps {
  data: Awaited<ReturnType<typeof getMyconversation>>[0];
}

export function ConversationsListItem({ data }: UserBoxProps) {
  const router = useRouter();

  async function handleClick() {
    router.push(`/conversations/${data.id}`);  
  }
  return (
    <>
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-background p-3 transition hover:bg-accent"
      >
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="mb-1 flex items-center justify-between pl-2 pt-4">
              <p className="text-sm font-medium text-foreground">
                {data.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
