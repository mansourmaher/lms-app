"use client";

import React from "react";
import ChapterResourcesItems from "./chapter-resources-items";
import { Attachment } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChapterResourcesProps {
  resources: Attachment[];
}

export default function ChapterResources({ resources }: ChapterResourcesProps) {
  return (
    <div>
      <ScrollArea className="h-[270px]  rounded-md  p-4">
        {resources.map((resource, index) => (
          <>
            <ChapterResourcesItems
              key={resource.id}
              index={index}
              resource={resource.url}
            />
          </>
        ))}
      </ScrollArea>
    </div>
  );
}
