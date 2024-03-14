import { auth } from "@/auth";
import { getCourseComments } from "@/actions/course/get-course-comments";
import { getCourseById } from "@/actions/course/get-course-byId";
import SingleCourse from "./_components/single-course";
import { existingPurchase } from "@/actions/teacher/existing-purchase";
import { totalPurchase } from "@/actions/course/total-purchase";

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
  const comments = await getCourseComments(course.id!);
  const isuserPurchasedthiscourse = await existingPurchase(courseId);
  const courseTotalPurchased = await totalPurchase(courseId);

  return (
    <>
      <SingleCourse
        course={course}
        comments={comments}
        userId={userId}
        isuserPurchasedthiscourse={isuserPurchasedthiscourse}
        courseTotalPurchased={courseTotalPurchased}
      />
    </>
  );
};
export default CoursePage;
