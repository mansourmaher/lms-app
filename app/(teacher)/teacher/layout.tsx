import { getAllCommunity } from "@/actions/community/get-all-community";

import { auth } from "@/auth";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import Navbar from "@/app/(dashboard)/_components/navbar";
import Sidebar from "@/app/(dashboard)/_components/sidebar";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  const community = await getAllCommunity();
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  const userId = user?.user.id as string;
  const notifications = await getAllNotifications();
  return (
    <>
      {isaverifiredteacher ? (
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar  />
          </div>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar
              community={community}
              isverifiedteacher={isaverifiredteacher}
            />
          </div>

          <main className="md:pl-56 pt-[80px] h-full">{children}</main>
        </div>
      ) : (
        <div className="max-h-full">
          <img src="/forbidden.jpg" alt="forbidden"
           className="mx-auto w-[800px]" />
        </div>
      )}
    </>
  );
};
export default LayoutDashbord;
