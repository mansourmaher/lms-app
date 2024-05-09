"use client";

import { Chapter } from "@prisma/client";
import { use, useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: any;
}

export const ChapterList = ({ items, onEdit, onReorder }: ChapterListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  //@ts-ignore
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative flex items-center justify-between px-4 py-2 space-x-4 bg-white rounded-md shadow-sm"
                  >
                    <div className="flex justify-between gap-x-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {chapter.title}
                      </h3>
                    </div>

                    {chapter.isFree ? (
                      <Badge>Free</Badge>
                    ) : (
                      <Badge className="bg-red-500">Paid</Badge>
                    )}
                    <Badge
                      className={cn(
                        "bg-slate-500",
                        chapter.isPublished ? "bg-green-500" : "bg-red-500"
                      )}
                    >
                      {chapter.isPublished ? "Published" : "Draft"}
                    </Badge>

                    <button
                      onClick={() => onEdit(chapter.id)}
                      className="flex items-center justify-center w-8 h-8 text-gray-400 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
