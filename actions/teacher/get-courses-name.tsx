"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getCoursesName() {
  try {
    const user = await auth();
    const userId = user?.user.id;
    const courses = await db.course.findMany({
      where: {
        userId: userId,
        isPublished: true,
      },
      select: {
        title: true,
      },
    });
    return courses;
  } catch (e) {
    console.log(e);
  }
}
