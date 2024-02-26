"use server"

import { db } from "@/lib/db";


export async function getTeacherRating(teacherId: string) {
    const courses = await db.course.findMany({
        where: {
        userId: teacherId,
        },
        include: {
        review: true,
        },
    });
    let totalReview = 0;
    let totalStars = 0;
    courses.forEach((course) => {
        totalReview += course.review.length;
        course.review.forEach((review) => {
        totalStars += review.starts!;
        });
    });
    return totalStars / totalReview;
    }
