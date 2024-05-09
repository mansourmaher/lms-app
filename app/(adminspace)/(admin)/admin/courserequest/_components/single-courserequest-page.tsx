import { getAllCourseRequest } from "@/actions/admin/get-all-course-request";
import React from "react";
import { DataTable } from "../_components_table/data-table";
import { columns } from "../_components_table/columns";

export const SingleCourseRequest = async () => {
  const courses = await getAllCourseRequest();

  return (
    <div>
      <DataTable data={courses} columns={columns} />
    </div>
  );
};
