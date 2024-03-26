import {
  getAllCourseIncludeProgresse,
  getCourseIncludeProgresse,
} from "@/actions/teacher/get-all-course-include-progresse";
import { teacherGetMyCourses } from "@/actions/teacher/teacher-getMy-courses";
import SingleCourse from "@/app/(course)/course/[courseId]/_components/single-course";
import SingleCoursePage from "./single-course-page";
import { auth } from "@/auth";

const TeacherCoursePage = async () => {
  // const courses = await teacherGetMyCourses();
  //const courseIncludeProgress=await getAllCourseIncludeProgresse()
  const courseUserIncludeProgress = await getCourseIncludeProgresse("679028c9-47d9-4c02-89de-b049b2cbc406");

  return (
    <div>
      <SingleCoursePage couresesIncludeProgress={courseUserIncludeProgress} />
    </div>
  );
};
export default TeacherCoursePage;
