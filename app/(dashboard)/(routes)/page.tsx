import { getTop2Courses } from "@/actions/course/get-top-5-courses";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await auth();

  if (!user) {
    redirect("/sign-in");
  }
  const top2Couses=await getTop2Courses()
  console.log(top2Couses)

  return (
    <div>
      {JSON.stringify(user)}
      {/* <ListCourse /> */}
    </div>
  );
}
