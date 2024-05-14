import { auth } from "@/auth";
import AdminNavbar from "../../_components/adminnavbar";
import Image from "next/image";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  const isAdmin = user?.user.role == "ADMIN";
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/error_401.jpg" width={900} height={900} alt="error" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <AdminNavbar />
      <div className="h-full ">{children}</div>
    </div>
  );
};
export default LayoutPage;
