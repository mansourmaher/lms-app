"use server";

import { db } from "@/lib/db";

export async function closeMeeting(meetingId: string) {
  return await db.meeting.update({
    where: {
      id: meetingId,
    },
    data: {
      status: "closed",
    },
  });
}
