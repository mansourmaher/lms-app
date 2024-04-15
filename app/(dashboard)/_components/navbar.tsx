import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobilesidebar";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { auth } from "@/auth";
import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import { getAllCommunity } from "@/actions/community/get-all-community";
import { getCourses } from "@/actions/course/get-courses";
import { getCoursesNameAndImage } from "@/actions/course/get-courses-image-name";


const Navbar = async () => {

  const teachers=await getTeacherWithCoursesCount()

  const notifications = await getAllNotifications();
  const user=await auth ()
  const userId=user?.user.id as string
  const courses=await getCoursesNameAndImage()
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar  />
      <NavbarRoutes notifications={notifications} userId={userId} teachers={teachers} courses={courses} />
    </div>
  );
};
export default Navbar;
