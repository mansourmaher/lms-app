"use server"

import { db } from "@/lib/db";



export async function getCourseRating(courseId: string) {
    const course = await db.course.findUnique({
        where: {
        id: courseId,
        },
        include: {
        review: true,
        },
    });
    let totalReview = 0;
    let totalStars = 0;
    course?.review.forEach((review:any) => {
        totalReview += 1;
        totalStars += review.starts!;
    });
    return totalStars / totalReview;
    }