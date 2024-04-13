"use client";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell, BellIcon } from "lucide-react";
import SingleNotifications from "../single-notification";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Notifications } from "@prisma/client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeacherNotificationProps {
  notifications: Awaited<ReturnType<typeof getAllNotifications>>;
  userId: string | undefined;
}

export default function TeacherNotification({
  notifications,
  userId,
}: TeacherNotificationProps) {
  const [notifcationNumber, setNotificationNumber] = useState<number>(0);
  const [notification, setNotification] =
    useState<Awaited<ReturnType<typeof getAllNotifications>>>(notifications);
  useEffect(() => {
    pusherClient.subscribe("notification");
    pusherClient.bind("new-notification", (data: any) => {
      if (data.notification.teacher === userId) {
        setNotification((prev) => [data.notification, ...prev]);
        setNotificationNumber((prev) => prev + 1);
      }
    });
    return () => {
      pusherClient.unsubscribe("notification");
    };
  }, [notifications]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-10 h-10 p-0 rounded-full relative"
          )}
        >
          {notifcationNumber > 0 && (
            <span className="absolute top-[-5px] right-[-3px] flex justify-center items-center  border w-[20px] h-[20px] p-1 bg-destructive rounded-full text-[18px]">
              {notifcationNumber}
            </span>
          )}
          <div className="bg-muted rounded-full  border p-1">
            <Bell className="w-[25px] h-[25px] text-muted-foreground " />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        asChild
        className="w-full mt-6 p-0 h-[20px]"
        align="center"
      >
        <div className="bg-white shadow-md ">
          <div
            id="dropdownNotification"
            className="z-20  w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
            aria-labelledby="dropdownNotificationButton"
          >
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notifications
            </div>

            {notification.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            )}
            <ScrollArea className="h-[500px]  rounded-md border p-4">
              {notification.map((notification) => (
                <SingleNotifications
                  key={notification.id}
                  notifcation={notification}
                />
              ))}
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
