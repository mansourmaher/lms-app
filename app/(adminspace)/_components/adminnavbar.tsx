import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { DialogDemo } from "@/app/room/[roomId]/_components/createroommodal";
import { UserButton } from "@/components/Auth/user-button";
import { Logo } from "@/app/(dashboard)/_components/logo";
import { getAllNotifications } from "@/actions/teacher/get-all-notifications";
import { auth } from "@/auth";
import SheetNotification from "@/components/Auth/notification-sheet";
import { getTheFirstConversation } from "@/actions/conversation/getthefirstconversation";
import { getteacherfirstconversation } from "@/actions/conversation/getteacherfirstconversation";
import { getFirstCommunity } from "@/actions/community/getfirstcommunity";
import LogoutBtn from "@/app/(dashboard)/_components/logoutbtn";

const AdminNavbar = async () => {
  const notifs = await getAllNotifications();
  const user = await auth();
  const userId = user?.user.id;
  const firstconversationId = await getTheFirstConversation();
  const firstComunity = await getFirstCommunity();
  return (
    <header className=" top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6  lg:w-[1150px]">
        <Logo />
        <div className="border-r-2 border-muted h-16"></div>

        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/admin/admin_dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>

        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/admin/courserequest">Course Request</Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/admin/course">Courses </Link>
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-muted-foreground transition-colors hover:text-foreground"
          asChild
        >
          <Link href="/admin/request">Teacher</Link>
        </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Users
            </Link>
            <Button
              variant={"link"}
              size={"sm"}
              className="text-muted-foreground transition-colors hover:text-foreground"
              asChild
            >
              <Link href="/admin/courserequest">Course Request</Link>
            </Button>

            <Button
              variant={"link"}
              size={"sm"}
              className="text-muted-foreground transition-colors hover:text-foreground"
              asChild
            >
              <Link href="/teacher/check">WorkFlow</Link>
            </Button>
            <DialogDemo />
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {/* <Link href="?modal=true">
              <button type="button" className="bg-blue-500 text-white p-2">
                Open Modal
              </button>
            </Link> */}
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            /> */}
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <UserButton />
            <DropdownMenuSeparator />
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetNotification notifications={notifs} userId={userId} />
      </div>
    </header>
  );
};

export default AdminNavbar;
