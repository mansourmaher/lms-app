"use client";

import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
      {/* <div
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
      </div>  */}

      <div
        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer px-6 py-4 flex items-center gap-4"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage alt="Michael Johnson" src={data.course?.imageUrl!} />
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{data.course?.title}</h3>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
              {data.messages[0]?.body}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {data.messages[0]?.createdAt &&
                  formatDistance(
                    new Date(data.messages[0]?.createdAt),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  ) == "less than a minute ago" &&
                  "Just now"}
                {data.messages[0]?.createdAt &&
                  formatDistance(
                    new Date(data.messages[0]?.createdAt),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  ) != "less than a minute ago" &&
                  formatDistance(
                    new Date(data.messages[0]?.createdAt),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
              </span>

              {!data.messages[0]?.createdAt && "No messages yet"}
           
          </div>
        </div>
      </div>
      <Separator className="h-1 text-gray-300" />
    </>
    /* android
              less than a minute ago*/
  );
}
