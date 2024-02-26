"use server"
import { use } from 'react';
import { db } from '@/lib/db';
import { getCourses } from './get-courses';



export async function getCoursesCountByTeacher(teacherId: string) {
  const courses = await db.course.findMany({
    where: {
      userId: teacherId,
    },
  });
  return courses.length;
}

export async function getTeacherReviewCount(teacherId: string) {
  const courses = await db.course.findMany({
    where: {
      userId: teacherId,
    },
    include: {
      review: true,
    },
  });
  let totalReview = 0;
  courses.forEach((course) => {
    totalReview += course.review.length;
  });
  return totalReview;
}
