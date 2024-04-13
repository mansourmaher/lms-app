import { getAllCommunity } from "@/actions/community/get-all-community";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import Sidebar from "@/app/(dashboard)/_components/sidebar";
import { auth } from "@/auth";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const community = await getAllCommunity();
  const user = await auth();
  const userId = user?.user.id as string;
  const notifications = await getAllNotifications();
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-70 flex-col fixed inset-y-0 z-50 ">
        <Sidebar
          community={community}
          notifications={notifications}
          userId={userId}
        />
      </div>

      <div className="md:pl-80 h-full   ">{children}</div>
    </div>
  );
};
export default LayoutPage;
