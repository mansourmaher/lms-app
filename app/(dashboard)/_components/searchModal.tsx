"use client";
import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import { getCourses } from "@/actions/course/get-courses";
import { getCoursesNameAndImage } from "@/actions/course/get-courses-image-name";
import CoursesSearchInput from "@/components/models/courses-search-input";
import TeacherSearchInput from "@/components/teacher-search-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { set } from "date-fns";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { MdKeyboardControlKey, MdOutlineKeyboardControlKey } from "react-icons/md";

interface SearchModalProps {
  courses: Awaited<ReturnType<typeof getCoursesNameAndImage>>;
  teacher: Awaited<ReturnType<typeof getTeacherWithCoursesCount>>;
}
export default function SearchModal({ courses, teacher }: SearchModalProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.ctrlKey && event.key === "k") {
        setIsModalOpen(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <Button variant={"outline"} className="flex items-center space-x-1">
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="pl-2 text-muted-foreground">Search...</span>
          
            <div className="w-12"></div>
            {/*  i want the ctrl key icon*/}
            <span className="pl-2 text-muted-foreground">+K</span>
          
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Browse Courses and Teachers</DialogTitle>
          <DialogDescription>
            Here you can filter courses by name <br></br>
            also you can search it by teacher name
          </DialogDescription>
        </DialogHeader>

        <div className="w-full ">
          <div className="flex  items-center pl-2  border border-gray-900/10 rounded-lg">
            <Search className="h-6 w-6" />
            <div>
              <CoursesSearchInput courses={courses} />
            </div>
            <div>
              <TeacherSearchInput teachers={teacher} />
            </div>
          </div>
          {/* <Tabs>
            <TabsList>
              <TabsTrigger value="teacher">Search by teacher</TabsTrigger>
              <TabsTrigger value="course">Search by course</TabsTrigger>
            </TabsList>
            <TabsContent value="teacher">
                <TeacherSearchInput teachers={teacher} />   
            </TabsContent>
            <TabsContent value="course">
              <CoursesSearchInput courses={courses} />
            </TabsContent>
            
          </Tabs> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
