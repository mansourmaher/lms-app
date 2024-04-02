import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar  from "./sidebar";
import { getAllCommunity } from "@/actions/community/get-all-community";

interface MobileSidebarProps {
  community: Awaited<ReturnType<typeof getAllCommunity>>;
}

export const MobileSidebar = ({community}:MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side="left" className=" bg-white p-0">
        <Sidebar community={community} />
      </SheetContent>
    </Sheet>
  );
};
