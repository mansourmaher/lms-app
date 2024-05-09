import TeachersSidebar from "./_components/teacher-sidebar";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed border-r-2 inset-y-0 z-50 bg-white ">
        <TeachersSidebar />
      </div>

      <div className="md:pl-80 h-full   ">{children}</div>
    </div>
  );
};
export default LayoutPage;
