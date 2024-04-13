import { getAllCommunity } from "@/actions/community/get-all-community";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { auth } from "@/auth";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  const community = await getAllCommunity();
  const user = await auth();
  const userId = user?.user.id as string;
  const notifications = await getAllNotifications();
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar community={community} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar community={community} />
      </div>

      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
