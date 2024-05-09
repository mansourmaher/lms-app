"use client";

import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogOverlay,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { Children } from "react";
import { Button } from "../ui/button";

interface ConfirmModelProps {
  chpaterId: string;

  onDelete: (id: string) => void;
}

export const ConfirmModel = ({ onDelete, chpaterId }: ConfirmModelProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-x-2" asChild>
        <Button className="rounded-full p-4 " size="sm" variant="ghost">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this chapter? You cant undo this
          action afterwards.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={() => {
              onDelete(chpaterId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <AlertDialogOverlay />
    </AlertDialog>
  );
};
