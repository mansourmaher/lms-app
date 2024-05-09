"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

function TeacherBtn() {
  const router = useRouter();
  return (
    <DropdownMenuItem onClick={() => router.push("/teacher_dashbord")}>
      Switch to Teacher
    </DropdownMenuItem>
  );
}

export default TeacherBtn;
