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
  const courseUserIncludeProgress = await getCourseIncludeProgresse();

  return (
    <div>
      <SingleCoursePage couresesIncludeProgress={courseUserIncludeProgress} />
    </div>
  );
};
export default TeacherCoursePage;
