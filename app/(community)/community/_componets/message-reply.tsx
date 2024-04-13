"use client";

import React from "react";
import { CommunityUploadImage } from "./comunity-upload-image";
import { Input } from "@/components/ui/input";
import { addPostInCommunity } from "@/actions/community/add-post-incomunity";
import { replyInPost } from "@/actions/community/reply-in-post";
import { Send } from "lucide-react";

interface MessageProps {
  communityId: string;
  posttoreply?: string | null;
  onclicke?: () => void;
}

export default function MessageReply({
  communityId,
  posttoreply,
  onclicke,
}: MessageProps) {
  const [image, setImage] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState("");

  const handelreply = async (message: string) => {
    console.log(posttoreply)
    await replyInPost(communityId, posttoreply!, message,image);
    onclicke!();
    setMessage("");
  };
  console.log(image);
  return (
    <div className="mt-2 bg-gray-100 p-2 text-center  text-gray-700">
      <div className="flex items-center justify-between gap-x-2">
      <CommunityUploadImage
        communityId={communityId}
        onchange={(url) => setImage(url)}
      />
      <Input
        placeholder="Reply to this post"
        className="w-full p-4 rounded-lg bg-white"
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Send
        size={24}
        className="text-blue-500 cursor-pointer"
        onClick={() => handelreply(message)}
        />
    </div>
    </div>
  );
}
