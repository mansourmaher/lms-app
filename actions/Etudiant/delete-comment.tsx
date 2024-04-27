"use server";

import { db } from "@/lib/db";

export async function deletecomment(commentId: string) {
  const courseofthecomment = await db.course.findFirst({
    where: {
      review: {
        some: {
          id: commentId,
        },
      },
    },
  });
  const getthecomment = await db.courseReview.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!getthecomment) {
    return "Comment not found";
  }
  if (!courseofthecomment) {
    return "Course not found";
  }
  await db.courseReview.delete({
    where: {
      id: commentId,
    },
  });
  const upgradeStars = await db.course.update({
    where: {
      id: courseofthecomment.id,
    },
    data: {
      totalStars: {
        decrement: getthecomment.starts!,
      },
      totalReviews: {
        decrement: 1,
      },
    },
  });
  return "Comment deleted";
}
