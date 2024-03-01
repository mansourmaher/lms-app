"use client";

interface PurchaseBtnProps {
  courseId: string;
  userId: string;
}

import { purchaseCourse } from "@/actions/Etudiant/purchase-course";
import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";

export default function PurchaseButton({ courseId, userId }: PurchaseBtnProps) {
  const onclick = async (courseId: string) => {
    await purchaseCourse({ courseId, userId }).then((res) => {
        if (res.success) {
            toast.success("Course purchased successfully");
        
      } else {
        toast.error("Course already purchased");
      }
    });
  };
  return (
    <Button
      onClick={() => onclick(courseId)}
      variant="primary"
      className="w-full"
    >
      Purchase
    </Button>
  );
}
