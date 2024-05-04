import { auth } from "@/auth";
import TeacherNavbar from "./_componets/teacher-navbar";
import Image from "next/image";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  if (!isaverifiredteacher) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/error_401.jpg" width={900} height={900} alt="error" />
      </div>
    );
  }
  return (
    <div className="max-h-full">
      <TeacherNavbar />
      <div>{children}</div>
    </div>
  );
};
export default LayoutPage;
