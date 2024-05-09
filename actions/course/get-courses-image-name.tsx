"use server";

import { db } from "@/lib/db";

export async function getCoursesNameAndImage() {
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      status: "verified",
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });
  return courses;
}
