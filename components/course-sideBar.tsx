import { ChapterSidebarItem } from "@/app/(course)/course/[courseId]/_components/chapter-sidebar";
import { auth } from "@/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { getProgress } from "@/actions/course/get-progress";
import CourseProgress from "./course-progress";
import { db } from "@/lib/db";

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
  const userProgress = await getProgress(userId, course?.id);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1>{course?.title}</h1>
        <div>
          <CourseProgress
            userId={userId}
            courseId={course?.id}
            userProgress={userProgress}
          />
        </div>
      </div>
      <div className="flex flex-col w-full ">
        {course?.chapters &&
          course.chapters.map((chpaters) => (
            <ChapterSidebarItem
              key={chpaters.id}
              id={chpaters.id}
              label={chpaters.title}
              isCompleted={!!chpaters.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chpaters.isFree}
            />
          ))}
      </div>
    </div>
  );
};
