"use client";

import { Attachment } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import PdfResource from "./pdf-resource";

interface ChapterResourcesProps {
  resources: Attachment[];
}

export default function ChapterResources({ resources }: ChapterResourcesProps) {
  return (
    <div>
      <ScrollArea className="h-[200px]  rounded-md  p-4">
        {resources?.map((resource, index) => (
          <>
            <PdfResource
              key={index}
              info={resource.url}
              work={"Resource "+ (index+1)}

            />
          </>
        ))}
      </ScrollArea>
    </div>
  );
}
