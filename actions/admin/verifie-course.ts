"use server";

import { db } from "@/lib/db";
import { sendRealMail } from "@/lib/real_mail/mail";

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

export async function rejectCourseByid(id: string, reason: string) {
  const getCourseById=await db.course.findUnique({
    where:{
      id
    },
    select:{
      user:{
        select:{
          email:true,
          name:true
        }
      }
    }
  })
  const course = await db.course.update({
    where: {
      id,
    },
    data: {
      status: "rejected",
      whyitsrejcted: reason,
      isPublished: false,
    },
  });
  const notification = await db.notifications.create({
    data: {
      message: `Your course has been rejected Check your email for more information`,
      student: course.userId,
      courseId: course.id,

      teacher: course.userId,
    },
  });
  const sendMail=await sendRealMail({
    to:getCourseById?.user?.email!,
    name:getCourseById?.user?.name!,
    subject:"Course Rejected",
    body:`<p>Your course has been rejected because ${reason}</p>`
  })

  return course;
}
