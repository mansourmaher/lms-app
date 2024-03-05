import { ChapterSidebarItem } from "@/app/(course)/course/[courseId]/_components/chapter-sidebar";
import { auth } from "@/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { getProgress } from "@/actions/course/get-progress";
import CourseProgress from "./course-progress";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CourseSideBarProps {
  courseId: string;
}

export const CourseSideBar = async ({ courseId }: CourseSideBarProps) => {
  const user = await auth();
  const userId = user?.user.id as string;

  // const purchase = await db.purchase.findUnique({
  //   where: {
  //     userId_courseId: {
  //       userId: userId,
  //       courseId: course.id,
  //     },
  //   },
  // });
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId,
            },
          },
        },

        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const courseUser = await db.courseUser.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });

  const userProgress = await getProgress(userId, course?.id);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="pl-8 pt-6 flex flex-col border-b">
        <div className="flex gap-x-3 items-center mt-4">
          <Avatar className="h-10 w-10 ">
            <AvatarImage
              className="rounded-full"
              src={user?.user.image || ""}
              alt={user?.user.name!}
            />
            <AvatarFallback className="uppercase">
              {user?.user.name![0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-semibold">{user?.user.name}</div>
            <div className="text-xs text-gray-500">{user?.user.email}</div>
          </div>

          <CourseProgress
            userId={userId}
            courseId={course?.id}
            userProgress={userProgress}
          />
        </div>
        <div className="mt-4 w-full text-gray-500 text-sm">
          <p>
            You have completed{" "}
            {
              course?.chapters.filter((chapter) => {
                return chapter.userProgress?.[0]?.isCompleted;
              }).length
            }{" "}
            of {course?.chapters.length} chapters
          </p>
          <p>
            You Progression Now is{" "}
            <span className="text-base">{userProgress}%</span> <br />
            {userProgress === 100 && "Congratulations"}
            {userProgress < 100 && userProgress > 0 && "Keep Going"}
            {userProgress === 0 && "Start Now"}
            {userProgress === 100 ? (
              <span className="text-green-500"> 🎉</span>
            ) : (
              <span className="text-red-500"> 🚀</span>
            )}
          </p>
        </div>
        <hr
          className="border-t border-gray-200 mt-6 mb-6"
          style={{ width: "90%" }}
        />
      </div>
      <div className="flex flex-col w-full ">
        {course?.chapters &&
          course.chapters.map((chpaters) => (
            <ChapterSidebarItem
              key={chpaters.id}
              id={chpaters.id}
              label={chpaters.title}
              isCompleted={chpaters.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chpaters.isFree}
              isPurchased={!!courseUser}
              description={chpaters.descreption!}
            />
          ))}
      </div>
    </div>
  );
};
