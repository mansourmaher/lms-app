import { getAllCourses } from "@/actions/admin/getallcourses";
import React from "react";
import { DataTable } from "../_components_table/data-table";
import { columns } from "../_components_table/columns";

const SingleCoursesPageByAdmin = async () => {
  const courses = await getAllCourses();

  return (
    <>
      <DataTable data={courses} columns={columns} />
    </>
  );
};

export default SingleCoursesPageByAdmin;
