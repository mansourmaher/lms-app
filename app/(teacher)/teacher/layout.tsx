import TeacherNavbar from "@/app/(teacherdashbord)/teacher_dashbord/_componets/teacher-navbar";
import { auth } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
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
    <div className="h-full">
      <TeacherNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
