import {
  getMyStudentsIncludetheirageIncludetheircount,
  getTop5PurchasedCoursesByTeacher,
} from "@/actions/dashboard/gettop5coursebyteacher";
import React from "react";
import CourseBarchat from "./course_barchat";

const CourseChart = async () => {
  const coursedata = await getTop5PurchasedCoursesByTeacher();
  const studentincludeage =
    await getMyStudentsIncludetheirageIncludetheircount();

  return (
    <>
      <CourseBarchat courses={coursedata} student={studentincludeage} />
    </>
  );
};

export default CourseChart;
