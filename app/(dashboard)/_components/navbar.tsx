import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobilesidebar";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { auth } from "@/auth";

const Navbar = async () => {

  const notifications = await getAllNotifications();
  const user=await auth ()
  const userId=user?.user.id as string
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes notifications={notifications} userId={userId} />
    </div>
  );
};
export default Navbar;
