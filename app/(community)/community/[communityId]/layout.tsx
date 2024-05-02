// import { getAllCommunity } from "@/actions/community/get-all-community";
// import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
// import Sidebar from "@/app/(dashboard)/_components/sidebar";
// import { auth } from "@/auth";

// const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
//   const community = await getAllCommunity();
//   const user = await auth();
//   const isverifiedteacher =
//     user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
//   return (
//     <div className="h-full">
//       <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
//         <Sidebar community={community} isverifiedteacher={isverifiedteacher} />
//       </div>

//       <div className="md:pl-56 h-full   ">{children}</div>
//     </div>
//   );
// };
// export default LayoutPage;
import { getAllCommunity } from "@/actions/community/get-all-community";

import { auth } from "@/auth";
import { getMyconversation } from "@/actions/conversation/getmyconversation";
import StudentNavbar from "@/app/(dashboard)/_components/student_navbar";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;

  const community = await getAllCommunity();
  const myconversation = await getMyconversation();
  return (
    <div className="h-full">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <StudentNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        {/* <Sidebar
          community={community}
          isverifiedteacher={isaverifiredteacher}
        /> */}
      </div>

      <main className=" pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
