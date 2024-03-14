"use client";

import React from "react";

interface ChapterDescreptionProps {
  descreption: string;
}

export default function ChapterDescreption({
  descreption,
}: ChapterDescreptionProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">About this chapter</h1>
      <p className="text-sm text-muted-foreground mt-1.5  line-clamp-3 h-14 mb-6"></p>
    </div>
  );
}
