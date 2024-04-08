"use server"

import { db } from "@/lib/db";

export async function getCoursesNameAndImage() {
  const courses = await db.course.findMany({
    select: {
        id: true,
      title: true,
      imageUrl: true,
      isPublished: true,
    },
  });
  return courses;
}