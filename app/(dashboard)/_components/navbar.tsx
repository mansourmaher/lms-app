import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobilesidebar";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { auth } from "@/auth";
import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import { getAllCommunity } from "@/actions/community/get-all-community";

interface NavbarProps {
  community:Awaited<ReturnType<typeof getAllCommunity>>
}
const Navbar = async ({community}:NavbarProps) => {

  const teachers=await getTeacherWithCoursesCount()

  const notifications = await getAllNotifications();
  const user=await auth ()
  const userId=user?.user.id as string
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar community={community} />
      <NavbarRoutes notifications={notifications} userId={userId} teachers={teachers} />
    </div>
  );
};
export default Navbar;
