import { BookA, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseSideBar } from "@/components/course-sideBar";

interface MobileSidebarProps {
  courseId: string;
}
export const CourseMobilesidebar = ({ courseId }: MobileSidebarProps) => {
  return (
    <Sheet >
      <SheetTrigger className="md:hidden pr-1 hover:opacity-75 transition  ">
        <BookA className="text-blue-500" size={24} />
      </SheetTrigger>
      <SheetContent side="left" className=" bg-white p-0">
        <CourseSideBar courseId={courseId!} />
      </SheetContent>
    </Sheet>
  );
};
