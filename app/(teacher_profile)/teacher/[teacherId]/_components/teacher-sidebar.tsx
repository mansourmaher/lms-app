import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";
import React from "react";
import TecaherListItem from "./teacher-list-item";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeacherListSidebar from "./teacherList-sidebar";

const TeachersSidebar = async () => {
  const teachers = await getAllUnstroctor(null);
  return (
    <div className="bg-white">
      <div className="text-center">
        <p className="text-2xl font-bold mb-8 mt-8">
          Recommendation formateur for you
        </p>
        <div className="mb-6">
          <span>
            Here are a few Formateur we think you will liked base on here Rating
            and Reviews
            <br />
            Other student with similar interest have found these courses helpful
          </span>
        </div>
      </div>

      <div>
        <TeacherListSidebar teachers={teachers} />
      </div>
    </div>
  );
};
export default TeachersSidebar;
