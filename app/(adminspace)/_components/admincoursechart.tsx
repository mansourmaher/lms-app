import React from "react";
import AdminCoursesBarChart from "./admincoursesbartchart";
import {
  getMyStudentsIncludetheirageIncludetheircount,
  getTop5PurchasedCoursesByTeacher,
} from "@/actions/admin/dashboard/barchartdataadmin";

const AdminCourseChart = async () => {
  const coursedata = await getTop5PurchasedCoursesByTeacher();
  const studentincludeage =
    await getMyStudentsIncludetheirageIncludetheircount();
  console.log(studentincludeage);

  return (
    <>
      <AdminCoursesBarChart courses={coursedata} student={studentincludeage} />
    </>
  );
};

export default AdminCourseChart;
