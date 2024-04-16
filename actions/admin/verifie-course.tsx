"use server";

import { db } from "@/lib/db";

export async function verifieCourse(id: string) {
  console.log(id);
  const course = await db.course.update({
    where: {
      id,
    },
    data: {
      status: "verified",
    },
  });
  return course;
}

export async function rejectCourseByid(id: string) {
  const course = await db.course.update({
    where: {
      id,
    },
    data: {
      status: "rejected",
    },
  });
  return course;
}
