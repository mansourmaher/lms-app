"use client";

import {
  BarChart2,
  BookAIcon,
  ChefHatIcon,
  Compass,
  ContrastIcon,
  Layout,
  List,
  User,
} from "lucide-react";
import { SidebarItem } from "./sidebarItem";
import { usePathname } from "next/navigation";

const geustRoutes = [
  {
    icon: Layout,
    label: "Home",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
  {
    icon: User,
    label: "Instructor",
    href: "/unstructor",
  },
 
];
const teacherRoutes = [
  {
    icon: List,
    label: "courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart2,
    label: "Analysis",
    href: "/teacher/analyticts",
  },
  {
    icon: BookAIcon,
    label: "Courses",
    href: "/teacher/mycourses",
  },
  {
    icon: ContrastIcon,
    label: "WorkFlow",
    href: "/teacher/check",
  },
];
export const SideBarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : geustRoutes;
  return (
    <div className="w-full flex flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
