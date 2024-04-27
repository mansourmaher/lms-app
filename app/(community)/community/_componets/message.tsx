"use client";

import React from "react";
import { CommunityUploadImage } from "./comunity-upload-image";
import { Input } from "@/components/ui/input";
import { addPostInCommunity } from "@/actions/community/add-post-incomunity";
import { Send } from "lucide-react";
import { MdAttachment } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageProps {
  communityId: string;
}

export default function Message({ communityId }: MessageProps) {
  const [image, setImage] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");
  const handelAddPost = async (message: string, communityId: string) => {
    await addPostInCommunity(communityId, message, true, image!);
    setMessage("");
  };
  console.log(image);
  return (
    <div className="mt-2 bg-gray-100 p-2 text-center  text-gray-700">
      <div className="flex items-center justify-between gap-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CommunityUploadImage
                communityId={communityId}
                onchange={(url) => setImage(url)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-gray-600 dark:text-gray-300">
                Image
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <MdAttachment size={24} className="text-blue-500 cursor-pointer" />
        <Input
          placeholder="Write a message"
          className="w-full p-4 rounded-lg bg-white"
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Send
          size={24}
          className="text-blue-500 cursor-pointer"
          onClick={() => handelAddPost(message, communityId)}
        />
      </div>
    </div>
  );
}
