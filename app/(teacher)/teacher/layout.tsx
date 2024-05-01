import TeacherNavbar from "@/app/(teacherdashbord)/teacher_dashbord/_componets/teacher-navbar";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <TeacherNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
