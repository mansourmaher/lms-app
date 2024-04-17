import { CourseSideBar } from "@/components/course-sideBar";
import CourseMobilesidebar from "./_components/course-mobile-sidebar";
import { db } from "@/lib/db";
import CourseHedaer from "./_components/course-header";

const LayoutPage = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}) => {
  const courseTitleById = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      title: true,
    },
  });
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 ">
        <CourseSideBar courseId={params.courseId!} />
      </div>
      <div className="mx-8 md:hidden flex items-center border-b-2 ">
        <CourseMobilesidebar courseId={params.courseId!} />
        <CourseHedaer courseName={courseTitleById?.title!} />
      </div>

      <div className="md:pl-80 h-full ">{children}</div>
    </div>
  );
};
export default LayoutPage;
