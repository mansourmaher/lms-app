"use client";
import { verifieCourse } from "@/actions/admin/verifie-course";
import { Button } from "@/components/ui/button";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ValidateCourseProps {
  id: string;
}

export default function ValidateCourse({ id }: ValidateCourseProps) {
  const [isloading, setIsloading] = React.useState(false);
  const router = useRouter();

  const verifiecourse = async () => {
    router.push(`/admin/courses/${id} `);
    // setIsloading(true);
    // await verifieCourse(id);
    // setIsloading(false);
    // router.refresh();
  };
  return (
    <Button
      variant={"primary"}
      size={"sm"}
      onClick={verifiecourse}
      className="flex gap-x-2"
    >
      {isloading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          Validate
          <Check size={16} />
        </>
      )}
    </Button>
  );
}
