import StudentNavbar from "./_components/student_navbar";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <StudentNavbar />
      </div>

      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
