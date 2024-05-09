"use client";

import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import TecaherListItem from "./teacher-list-item";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TeacherListSidebarProps {
  teachers: Awaited<ReturnType<typeof getAllUnstroctor>>;
}

export default function TeacherListSidebar({
  teachers,
}: TeacherListSidebarProps) {
  const [searchValue, setSearchValue] = React.useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.user?.name!.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="rounded-lg p-4 w-full">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-2">
          <SearchIcon className="text-gray-400" />
          <Input
            className="bg-transparent flex-1 border-none focus:ring-0"
            placeholder="Find a teacher"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-8  ml-2  h-[550px] overflow-y-scroll">
        <ScrollArea>
          {filteredTeachers.map((teacher, index) => (
            <div key={index}>
              <TecaherListItem teacher={teacher} />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
