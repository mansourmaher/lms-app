"use client";

import Image from "next/image";
import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Video from "next-video";

interface Props {
  videosrc: string | null | undefined;
}

export default function ChapterVedio({ videosrc }: Props) {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  return (
    <div className="m-8 space-y-6">
      <div className="text-2xl font-bold">
        the title of the courses will display here
      </div>
      <div className="relative w-full h-[550px] aspect-video rounded-xl mb-4">
        <Video src={videosrc!} onEnded={()=>alert("end")} controls className="w-[550px] h-full" />
      </div>
    </div>
  );
}
