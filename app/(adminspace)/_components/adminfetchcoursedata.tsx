import {
    getMyStudentsIncludetheirageIncludetheircount,
    getTop5PurchasedCoursesByTeacher,
  } from "@/actions/dashboard/gettop5coursebyteacher";
  import React from "react";
  
  
  const CourseChart = async () => {
    const coursedata = await getTop5PurchasedCoursesByTeacher();
    const studentincludeage =
      await getMyStudentsIncludetheirageIncludetheircount();
      console.log(studentincludeage)
  
    return (
      <>
        {/* <CourseBarchat courses={coursedata} student={studentincludeage} /> */}
      </>
    );
  };
  
  export default CourseChart;