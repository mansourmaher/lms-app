"use client";

import { blockEcourse } from "@/actions/admin/blockecourse";
import { unblockecourse } from "@/actions/admin/unblockcourse";
import { Button } from "@/components/ui/button";
import { Check, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ValidateCourseProps {
  id: string;
}

function Unblockcourse({ id }: ValidateCourseProps) {
  const router = useRouter();
  const viewCourse = async () => {
    await unblockecourse(id);
    router.refresh();
  };
  return (
    <>
      <Button
        variant="primary"
        size={"sm"}
        onClick={viewCourse}
        className="flex gap-x-1"
      >
        <Check size={16} />
        Unblock
      </Button>
    </>
  );
}

export default Unblockcourse;
