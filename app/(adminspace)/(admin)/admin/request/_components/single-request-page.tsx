import { getAllTeacherRequest } from "@/actions/admin/get-all-teacher-request";
import React from "react";
import { DataTable } from "../_components_table/data-table";
import { columns } from "../_components_table/columns";

const SingleRequestPage = async () => {
  const request = await getAllTeacherRequest();
  
  return (
    <div>
      <DataTable data={request} columns={columns} />
    </div>
  );
};

export default SingleRequestPage;
