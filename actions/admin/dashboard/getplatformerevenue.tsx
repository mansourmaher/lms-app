"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getPlatformerevenue() {
  const courseuser = await db.courseUser.findMany({
    select: {
      createdAt: true,
      course: {
        select: {
          price: true,
        },
      },
    },
  });
  const revenue = courseuser.reduce((acc, curr) => acc + curr.course.price!, 0);
  const date = new Date();

  const month = date.getMonth();
  const revenueperlastmonth = courseuser.reduce((acc, curr) => {
    if (curr.createdAt.getMonth() == month - 1) {
      return acc + curr.course.price!;
    }
    return acc;
  }, 0);

  const percentage =
    ((revenue - revenueperlastmonth) / revenueperlastmonth) * 100;
  return {
    revenue,
    revenueperlastmonth,
    percentage,
  };
}

export async function getToatalSubscribtion() {
  const user = await auth();
  const userId = user?.user.id;
  const courseuser = await db.courseUser.findMany({
    where: {
      course: {
        userId: userId,
      },
    },
  });
  const totalSubscribtion = courseuser.length;
  const date = new Date();

  const month = date.getMonth();
  const subscribtionperlastmonth = courseuser.reduce((acc, curr) => {
    if (curr.createdAt.getMonth() == month - 1) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage =
    ((totalSubscribtion - subscribtionperlastmonth) /
      subscribtionperlastmonth) *
    100;
  return {
    totalSubscribtion,
    subscribtionperlastmonth,
    percentage,
  };
}

export async function getPublisedcourse() {
  const user = await auth();
  const userId = user?.user.id;
  const course = await db.course.findMany({
    where: {
      userId: userId,
      isPublished: true,
      status: "verified",
    },
  });
  const date = new Date();
  const month = date.getMonth();
  const courseperlastmonth = course.reduce((acc, curr) => {
    if (curr.createdAt.getMonth() == month - 1) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage =
    ((course.length - courseperlastmonth) / courseperlastmonth) * 100;

  return {
    courseperlastmonth,
    percentage,
    course: course.length,
  };
}
export async function getUnPublisedcourse() {
  const user = await auth();
  const userId = user?.user.id;
  const course = await db.course.findMany({
    where: {
      userId: userId,
      isPublished: true,
      status: "pending",
    },
  });
  return course.length;
}

export async function totalacceptedcourssincludemonthlyincrease() {
  const totlacourseinthismonth = await db.course.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const tottalcourseinlastmonth = await db.course.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  return {
    total: totlacourseinthismonth,
    increase: totlacourseinthismonth - tottalcourseinlastmonth,
  };
}
