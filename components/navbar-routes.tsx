"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { UserButton } from "./Auth/user-button";
import { SearchInput } from "./search_input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  console.log("pathnae" + pathname);

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPalayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname?.includes("/search");

  return (
    <>
    {
      isSearchPage &&(
        <div className="hidden md:block"><SearchInput /></div>
        
      )
    }
    <div className=" gap-x-2 ml-auto flex ">
      <UserButton />

      <Link href="/teacher/courses">
        <Button size="sm" variant="ghost">
          Teacher mode
        </Button>
      </Link>
    </div>
    </>
  );
};
