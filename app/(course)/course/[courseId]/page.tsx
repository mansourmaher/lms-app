import { auth } from "@/auth";
import { getCourseComments } from "@/actions/course/get-course-comments";
import { getCourseById } from "@/actions/course/get-course-byId";
import SingleCourse from "./_components/single-course";

const CoursePage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const courseId = params.courseId;
  const user = await auth();
  const userId = user?.user.id as string;

  const course = await getCourseById(courseId, userId);

  return (
    <>
      <SingleCourse course={course} />
    </>
  );
};
export default CoursePage;
