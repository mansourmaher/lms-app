"use client";

import { getAllCommunity } from "@/actions/community/get-all-community";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommunityDropdownProps {
  community: Awaited<ReturnType<typeof getAllCommunity>>;
}

export default function CommunityDropdown({
  community,
}: CommunityDropdownProps) {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="flex items-center gap-x-2 py-4">
            <Users size={22} />
            Community
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md py-2">
          <DropdownMenuLabel>Start New Thread</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {community.map((community) => (
            <DropdownMenuItem
              key={community.id}
              onClick={() => router.push(`/community/${community.id}`)}
            >
              {community.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
