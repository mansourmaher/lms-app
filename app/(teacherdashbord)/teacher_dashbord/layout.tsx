import TeacherNavbar from "./_componets/teacher-navbar";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-full">
      <TeacherNavbar />
      <div>{children}</div>
    </div>
  );
};
export default LayoutPage;
