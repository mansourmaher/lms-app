"use client";

import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { Notifications } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";



interface SingleNotificationsProps {
  notifcation: Awaited<ReturnType<typeof getAllNotifications>>[0];
}

export default function SingleNotifications({
  notifcation,
}: SingleNotificationsProps) {
  return (
    <div>
      <div>
        <a
          href="#"
          className="flex  py-3 hover:bg-gray-100 dark:hover:bg-gray-700  border-b border-gray-300 dark:border-gray-700  transition-colors duration-200 ease-in-out"
        >
          <div className="flex-shrink-0 mt-3">
            <Avatar className="h-10 w-10 ">
              <AvatarImage
                className="rounded-full"
                src={notifcation?.studentNotif.image!}
                alt={notifcation?.studentNotif.name!}
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
            <div className="text-xs text-blue-600 dark:text-blue-500">
              {/* i want to do the creation time - current time */}
              {format(new Date(notifcation?.createdAt!), "dd/MM/yyyy")} at{" "}
              {format(new Date(notifcation?.createdAt!).getHours(), "hh:mm a")}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
