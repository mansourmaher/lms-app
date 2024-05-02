"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function getLevelDistinctCount() {
  const intermidarecoursecount = await db.courseUser.count({
    where: {
      course: {
        level: "Intermediate",
      },
    },
  });
  const beginnercoursecount = await db.courseUser.count({
    where: {
      course: {
        level: "Beginner",
      },
    },
  });
  const advancedcoursecount = await db.courseUser.count({
    where: {
      course: {
        level: "Advanced",
      },
    },
  });
  const levelcount = [
    {
      level: "Intermediate",
      levelCount: intermidarecoursecount,
    },
    {
      level: "Beginner",
      levelCount: beginnercoursecount,
    },
    {
      level: "Advanced",
      levelCount: advancedcoursecount,
    },
  ];
  return levelcount;
}

export async function getTheoriginofsubscriptionuser() {
  
  const subscriptionuser = await db.courseUser.findMany({
    //distinct user how purchased the course
    distinct: ["userId"],

    where: {
      course: {
        
      },
    },
    include: {
      user: {
        include: {
          origin: true,
        },
      },
    },
  });
  const userfromafricacount = subscriptionuser.filter(
    (u) => u.user?.origin?.region === "Africa"
  ).length;
  const userfromasiacount = subscriptionuser.filter(
    (u) => u.user?.origin?.region === "Asia"
  ).length;
  const userfromeuropecount = subscriptionuser.filter(
    (u) => u.user?.origin?.region === "Europe"
  ).length;
  const userfromamericacount = subscriptionuser.filter(
    (u) => u.user?.origin?.region === "America"
  ).length;
  const userfromothercount = subscriptionuser.filter(
    (u) => u.user!.origin?.region === "Other"
  ).length;
  const subscriptionusers = [
    {
      userCount: userfromafricacount,
      region: "Africa",
    },
    {
      userCount: userfromasiacount,
      region: "Asia",
    },
    {
      userCount: userfromeuropecount,
      region: "Europe",
    },
    {
      userCount: userfromamericacount,
      region: "America",
    },

    {
      userCount: userfromothercount,
      region: "Other",
    },
  ];

  return subscriptionusers;
}
