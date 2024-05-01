import { getAllCommunity } from "@/actions/community/get-all-community";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { auth } from "@/auth";
import { getMyconversation } from "@/actions/conversation/getmyconversation";

const LayoutDashbord = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  
  const community = await getAllCommunity();
  const myconversation=await getMyconversation()
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar
          community={community}
          isverifiedteacher={isaverifiredteacher}
        />
      </div>

      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default LayoutDashbord;
