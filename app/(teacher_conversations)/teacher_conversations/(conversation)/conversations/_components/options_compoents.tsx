"use client";
import { getTheteacheroftheconversation } from "@/actions/conversation/gettheteacherofconversation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface OptionsComponetsProps {
  data: Awaited<ReturnType<typeof getTheteacheroftheconversation>>;
}

function OptionsComponets({ data }: OptionsComponetsProps) {
  const router = useRouter();
  const handelcourseClick = () => {
    router.push(`/course/${data?.id}`);
  };
  const handelTeacherClick = () => {
    router.push(`/teacher/${data?.user?.id}`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className="data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-5 w-5 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handelcourseClick}>
            View Course
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handelTeacherClick}>
            View Teacher Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsComponets;
