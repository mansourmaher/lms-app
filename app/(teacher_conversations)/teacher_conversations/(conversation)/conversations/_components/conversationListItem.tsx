"use client";

import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";

interface UserBoxProps {
  data: Awaited<ReturnType<typeof getMyconversation>>[0];
}

export function ConversationsListItem({ data }: UserBoxProps) {
  const router = useRouter();

  async function handleClick() {
    router.push(`/teacher_conversations/conversations/${data.id}`);
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
            <div className="flex flex-col pl-2">
              <p className="font-semibold text-foreground">{data.title}</p>
              <div className="text-xs text-muted-foreground pl-2 flex flex-col space-y-2">
                <span className="text-sky-500 ">
                  {data.messages[0]?.sender?.name}{" "}
                  {data.messages[0]?.createdAt &&
                    formatDistance(
                      new Date(data.messages[0]?.createdAt),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  {!data.messages[0]?.createdAt && "No messages yet"}
                </span>{" "}
                <span className="line-clamp-1">{data.messages[0]?.body}</span>
                <span className=" text-sky-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
