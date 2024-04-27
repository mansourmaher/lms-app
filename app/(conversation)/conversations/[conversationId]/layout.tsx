import { getAllCommunity } from "@/actions/community/get-all-community";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import Sidebar from "@/app/(dashboard)/_components/sidebar";
import { auth } from "@/auth";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const community = await getAllCommunity();
  const user = await auth();
  const isverifiedteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar community={community} isverifiedteacher={isverifiedteacher} />
      </div>

      <div className="md:pl-56 h-full  mx-auto ">{children}</div>
    </div>
  );
};
export default LayoutPage;
