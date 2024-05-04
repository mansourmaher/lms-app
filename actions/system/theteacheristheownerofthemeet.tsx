"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function theteacheristheownerofthemeet(meetingId: string) {
  const user = await auth();
  const userId = user?.user.id as string;
  const meeting = await db.course.findUnique({
    where: {
      id: meetingId,
      userId: userId,
    },
  });
  if (meeting) {
    return true;
  }

  return false;
}
