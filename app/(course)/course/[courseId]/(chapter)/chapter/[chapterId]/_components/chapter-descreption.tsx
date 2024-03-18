"use client";

import React from "react";

interface ChapterDescreptionProps {
  descreption: string | null;
}

export default function ChapterDescreption({
  descreption,
}: ChapterDescreptionProps) {
  return (
    <div className="ml-8">
      <h1 className="text-2xl font-semibold">About this chapter</h1>

      <div
        className="text-sm text-muted-foreground mt-1.5   h-14 mb-6"
        dangerouslySetInnerHTML={{ __html: descreption! }}
      ></div>
    </div>
  );
}
