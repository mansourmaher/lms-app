"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { rejectCourseByid } from "@/actions/admin/verifie-course";
import { useRouter } from "next/navigation";
interface ValidateCourseProps {
  id: string;
}

export default function RejectCourse({ id }: ValidateCourseProps) {
  const [isloading, setIsloading] = React.useState(false);
  const router=useRouter()
  const rejectCourse = async () => {
    setIsloading(true);
    await rejectCourseByid(id);
    setIsloading(false);
    router.refresh()
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-medium p-1" asChild>
        <Button variant={"destructive"} size={"sm"}>
          Reject <X className="text-white-500" size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={rejectCourse}
              className="flex gap-x-2"
            >
              {isloading ? "Rejecting" : "Reject"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
