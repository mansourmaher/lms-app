"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "../_components/courseForm";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";

import { redirect } from "next/dist/server/api-utils";

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const TeacherCoursePage = () => {
  const [myCourses, setMycourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setMycourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []); //[] bech mayd5olch fi boucle infin whowa yconsoli fihom

  return (
    <div className="px-6 py-6">
      <div className="flex justify-end p-8">
      <Button >
        <Link href="/teacher/create">
          <p>
            Create a new course
          </p>
        </Link>

      </Button>
    </div>
    <div>
      <DataTable columns={columns} data={myCourses} />
    </div>
    
    </div>
  );
};
export default TeacherCoursePage;
