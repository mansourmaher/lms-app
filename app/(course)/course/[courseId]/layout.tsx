import { getProgress } from "@/actions/course/get-progress";
import { auth } from "@/auth";
import { CourseSideBar } from "@/components/course-sideBar";
import { db } from "@/lib/db";
import { use } from "react";
import ChapterPage from "./chapter/[chapterId]/page";

const LayoutPage = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}) => {
  const user = await auth();
  const userId = user?.user.id as string;

  

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSideBar courseId={params.courseId!} />
      </div>
      <div className="md:pl-80 h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
