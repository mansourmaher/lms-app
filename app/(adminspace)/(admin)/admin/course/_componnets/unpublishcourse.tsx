"use client";

import { blockEcourse } from "@/actions/admin/blockecourse";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ValidateCourseProps {
  id: string;
}

function BlockeCourse({ id }: ValidateCourseProps) {
  const router = useRouter();
  const viewCourse = async () => {
    await blockEcourse(id);
    router.refresh();
  };
  return (
    <>
      <Button
        variant="destructive"
        size={"sm"}
        onClick={viewCourse}
        className="flex gap-x-2 px-4"
      >
        <X size={16} />
        Block
      </Button>
    </>
  );
}

export default BlockeCourse;
