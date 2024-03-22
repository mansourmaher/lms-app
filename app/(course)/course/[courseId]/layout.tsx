import { CourseSideBar } from "@/components/course-sideBar";
import { CourseMobilesidebar } from "./_components/course-mobile-sidebar";

const LayoutPage = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 ">
        <CourseSideBar courseId={params.courseId!} />
      </div>
      <div className="m-8 w-10">
        <CourseMobilesidebar courseId={params.courseId!} />
      </div>
      <div className="md:pl-80 h-full  ">{children}</div>
    </div>
  );
};
export default LayoutPage;
