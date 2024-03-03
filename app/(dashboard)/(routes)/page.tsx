import { getTop2Courses } from "@/actions/course/get-top-5-courses";
import { getAllCourseIncludeProgresse, getCourseIncludeProgresse } from "@/actions/teacher/get-all-course-include-progresse";
import { auth } from "@/auth";

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
      
      {/* <ListCourse /> */}
    </div>
  );
}
