"use client";

import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDistance } from "date-fns";
import { markNotificationAsRead } from "@/actions/teacher/markNotificationAsread";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SingleNotificationsProps {
  notifcation: Awaited<ReturnType<typeof getAllNotifications>>[0];
}

export default function SingleNotifications({
  notifcation,
}: SingleNotificationsProps) {
  const [wichCheck, setWichCheck] = React.useState(false);
  const router = useRouter();

  const handelmakeread = async (id: string) => {
    setWichCheck(true);
    await markNotificationAsRead(id);
  };

  return (
    <div>
      <div onClick={() => router.push('teacher/check')} className="cursor-pointer">
        <div className="flex  py-3 hover:bg-gray-100 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out">
          <div className="flex-shrink-0 mt-3">
            <Avatar className="h-10 w-10 ">
              <AvatarImage
                className="rounded-full"
                src={notifcation?.studentNotif?.image || ""} // i want to do the creation time - current time
                alt={notifcation?.studentNotif?.name!}
              />
              <AvatarFallback className="uppercase">
                {notifcation?.studentNotif.name![0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full ps-3">
            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
              {notifcation?.studentNotif.name}{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {notifcation?.message}
              </span>
              : "Hey, what's up? All set for the presentation?"
            </div>
            <div className="flex justify-between items-center ">
              <div className="text-xs text-blue-600 dark:text-blue-500 ">
                {/* i want to do the creation time - current time */}
                {formatDistance(new Date(notifcation?.createdAt!), new Date(), {
                  addSuffix: true,
                })}
              </div>
              <div>
                {notifcation?.isRead && (
                  <div className="flex gap-x-2">
                    <Check className="w-5 h-5 text-green-600 mr-6" />
                  </div>
                )}
                {!notifcation?.isRead ? (
                  <>
                    <p
                      onClick={() => {
                        handelmakeread(notifcation?.id);
                      }}
                      className="text-xs text-gray-500 dark:text-gray-400 mr-2 cursor-pointer"
                    >
                      <div>
                        {wichCheck ? (
                          <Check className="w-5 h-5 text-green-600 mr-6" />
                        ) : (
                          "Mark as read"
                        )}
                      </div>
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
