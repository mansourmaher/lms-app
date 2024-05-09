"use client";
import { getCurrentUser } from "@/hooks/getCurrentUser";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { LogoutButton } from "./logout-button";
import { AccesTeacher } from "../models/acces-teacher";
import { isTeacherHaveRequestPending } from "@/actions/getRequestByTeacherId";
import { useEffect, useMemo, useState } from "react";
import { ProfileInformation } from "../models/profile-information";
import { formatDate } from "date-fns";
import dynamic from "next/dynamic";
import { getThePostionOftheteacherById } from "@/actions/teacher/get-the-postion-of-the-teacher";

export const UserButton = () => {
  const currentUser = getCurrentUser();
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        loading: () => <p>loading...</p>,
        ssr: false,
      }),
    [currentUser?.origin?.lalng]
  );

  const [isTeacherRequestPending, setIsTeacherRequestPending] = useState(false);

  useEffect(() => {
    if (currentUser?.role === "TEACHER") {
      isTeacherHaveRequestPending(currentUser?.id!).then((res) => {
        console.log("res" + res);
        setIsTeacherRequestPending(res);
      });
    }
  }, [currentUser]);
  const originValue = currentUser?.origin
    ? `${currentUser.origin.region},${currentUser.origin.label}`
    : "";

  return (
    <Sheet>
      <SheetTrigger>
        <span className="relative flex hover:cursor-pointer  select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Profile
        </span>
      </SheetTrigger>
      <SheetContent side={"right"} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Manage your account and settings.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={currentUser?.image || ""}
              alt={currentUser?.name![0]}
            />
            <AvatarFallback>{currentUser?.name![0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-6 grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={currentUser?.name!}
            readOnly
            className="mt-2"
          />
          <Label>Email</Label>
          <Input value={currentUser?.email!} readOnly className="mt-2" />

          <Label>Date of Birth</Label>

          <Input
            value={formatDate(new Date(), "dd/MM/yyyy") || ""}
            readOnly
            className="mt-2"
          />
          <Label>Field of Study (Filier)</Label>
          <Input value={currentUser?.filier || ""} readOnly className="mt-2" />
          <Label>Country</Label>
          <Input value={originValue || ""} readOnly className="mt-2" />
          <Label>About</Label>
          <Input value={currentUser?.about || ""} readOnly className="mt-2" />
        </div>
        <Map center={currentUser?.origin?.lalng} />
        <SheetFooter>
          <div>
            {currentUser?.role === "TEACHER" &&
              currentUser?.teacherAccess === false &&
              isTeacherRequestPending && (
                <button className="w-full mt-4 bg-primary text-white rounded-md py-2">
                  You Request is Pending
                </button>
              )}
            {/* {currentUser?.role === "TEACHER" &&
            currentUser?.teacherAccess === false &&
            !isTeacherRequestPending ? (
              // <AccesTeacher />
            ) : null} */}
          </div>
          <div className="flex flex-row justify-between mt-4 w-full gap-3">
            <div className="flex-1">
              <ProfileInformation
                isTeacherhasRequest={isTeacherRequestPending}
              />
            </div>
            <div className="flex-1">
              <LogoutButton>Logout</LogoutButton>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
