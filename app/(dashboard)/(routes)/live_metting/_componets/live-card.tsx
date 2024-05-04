"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
interface LivecardProps {
  id: string;
}

function Livecard({ id }: LivecardProps) {
  const router = useRouter();
  return (
    <div
      className="p-4 bg-white flex flex-col border rounded-lg"
      onClick={() =>
        router.push(`${process.env.NEXT_PUBLIC_APP_URL!}/room/${id}`)
      }
    >
      <div className="relative w-full aspect-video rounded-xl mb-4">
        <Image
          className=" w-full object-cover rounded-xl"
          src="/images/avatar-placeholder.png"
          alt="Course Image"
          fill
          loading="lazy"
        />
      </div>
      <hr className="border-t border-muted-foreground mb-2" />

      <h1 className="text-lg font-semibold">lk,ds</h1>
      <p className="text-sm text-muted-foreground mt-1.5  line-clamp-3 h-14 mb-6">
        e,v
      </p>
      <div className="px-2"></div>
      <div className="flex flex-row justify-between items-center md:flex-cols-3 sm:flex-cols-3 ">
        <div className="flex ">
          <Badge variant="yellow" className="m-2">
            kml,sc
          </Badge>
        </div>
        <div className=" -mx-1">
          <Badge variant="outline">lzkdc</Badge>
        </div>
        <Badge variant="primary">dfvknl</Badge>
      </div>

      <div className="flex justify-between items-center">
        <div className="mt-6 ">
          <Button variant={"primary"}>
            <Link href={`/course`} className="flex items-center gap-x-3 ">
              <Eye size={18} /> View Course
            </Link>
          </Button>
        </div>
        <div className="mt-6 ">
          {/* <PurchaseButton courseId={id} userId={userId} /> */}
        </div>
      </div>
    </div>
  );
}

export default Livecard;
