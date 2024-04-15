import { Users2 } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ComunityUser } from "./comunity-users";
import { getAllusersInComunityById, getUsersInCommunity } from "@/actions/community/get-users-in-community";
import ComunityUserItem from "./comunity-users-item";

interface MobileSidebarProps {
  communityId: string;
}
export const UsersSidebar = async ({ communityId }: MobileSidebarProps) => {
  const users = await getAllusersInComunityById(communityId);
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ">
        <Users2 className="text-blue-500" size={24} />
      </SheetTrigger>
      <SheetContent side="right" className="w-full ">
        {/* <Sidebar community={community} isverifiedteacher={isaverifiredteacher} /> */}

        <div className="      w-full h-full">
          <div className=" px-7 text-sm font-semibold bg-white  py-8 border-b-2">
            Members - {users.length}
          </div>
          <div className="h-[580px] overflow-y-auto p-4  bg-gray-100">
            {users.map((user) => (
              <div key={user.id} className="flex  ">
                <ComunityUserItem user={user} />
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
