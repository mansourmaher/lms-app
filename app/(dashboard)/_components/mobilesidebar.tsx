import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar  from "./sidebar";
import { getAllCommunity } from "@/actions/community/get-all-community";
import { auth } from "@/auth";


export const MobileSidebar =async () => {
  const user=await auth();
  const isaverifiredteacher=user?.user.role=="TEACHER" && user?.user.teacherAccess==true;
  const community=await getAllCommunity();
  

  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side="left" className=" bg-white p-0 w-70">
        <Sidebar community={community} isverifiedteacher={isaverifiredteacher} />
      </SheetContent>
    </Sheet>
  );
};
