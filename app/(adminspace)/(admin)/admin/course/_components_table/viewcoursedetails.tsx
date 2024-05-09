"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ValidateCourseProps {
  id: string;
}

function ViewCourseDetail({ id }: ValidateCourseProps) {
  const router = useRouter();
  const viewCourse = () => {
    router.push(`/admin/courses/${id}`);
  };
  return (
    <>
      <Button
        variant={"primary"}
        size={"sm"}
        onClick={viewCourse}
        className="flex gap-x-2"
      >
        <Eye size={16} />
        View
      </Button>
    </>
  );
}

export default ViewCourseDetail;
