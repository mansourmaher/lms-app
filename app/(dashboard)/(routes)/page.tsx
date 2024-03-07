import {
  getAllCourseIncludeProgresse,
  getCourseIncludeProgresse,
} from "@/actions/teacher/get-all-course-include-progresse";
import ReviewProgress from "@/app/(course)/course/[courseId]/_components/course-review-progress";
import { auth } from "@/auth";
import TeacherNotifications from "@/components/Auth/teacher-notifications";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await auth();

  if (!user) {
    redirect("/sign-in");
  }
  //const top2Couses=await getTop2Courses()

  //const allUserCourse=await getAllCourseIncludeProgresse()

  //const courseUserIncludeProgress=await getCourseIncludeProgresse()

  return (
    <div>
      {JSON.stringify(user)}

      <ReviewProgress courseId="zc" />

      {/* <ListCourse /> */}
    </div>
  );
}
