"use client";

interface PurchaseBtnProps {
  courseId: string;
  userId: string;
}

import { purchaseCourse } from "@/actions/Etudiant/purchase-course";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PurchaseButton({ courseId, userId }: PurchaseBtnProps) {
  const [isloading, setIsloading] = React.useState(false);
  const onclick= async (courseId:string) => {
    setIsloading(true);

    axios
      .post("/api/purchase", {courseId,userId})
      .then((res) => {
        
        toast.success(res.data.message);
        
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  return (
    <Button
      onClick={() => onclick(courseId)}
      variant="secondary"
      className="w-full"
      disabled={isloading}
    >
      Purchase
    </Button>
  );
}
