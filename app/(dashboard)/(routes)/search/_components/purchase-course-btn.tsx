"use client";

interface PurchaseBtnProps {
  courseId: string;
  existingpurchase:boolean
}

import { purchaseCourse } from "@/actions/Etudiant/purchase-course";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function PurchaseButton({ courseId,existingpurchase }: PurchaseBtnProps) {
  const [isloading, setIsloading] = React.useState(false);
  const onclick= async (courseId:string) => {
   
    try{
      setIsloading(true);
      const respone=await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(respone.data.url)


    }catch(e){
      toast.error("something went wrong")
    }finally{
      setIsloading(false);
    }

    // axios
    //   .post("/api/purchase", {courseId,userId})
    //   .then((res) => {
        
    //     toast.success(res.data.message);
        
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   })
    //   .finally(() => {
    //     setIsloading(false);
    //   });
  };
  return (
    <Button
      onClick={() => onclick(courseId)}
      variant="secondary"
      className="w-full"
      disabled={isloading || existingpurchase}
    >
      Purchase
    </Button>
  );
}
