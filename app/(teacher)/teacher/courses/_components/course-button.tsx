"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CourseButton() {
  return (
    <div>
      <Button>
        <Link href="/teacher/create">
          <p>Create a new course</p>
        </Link>
      </Button>
    </div>
  );
}
