import { getCoursesBytecaher } from "@/actions/course/get-teacher-courses";
import { CourseCard } from "@/components/course-card";

interface TeacherCoursesProps {
  courses: Awaited<ReturnType<typeof getCoursesBytecaher>>;
}

const TeacherCourses = async ({ courses }: TeacherCoursesProps) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-6">
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              imageUrl={course.imageUrl!}
              chapterLenght={course.chapters.length!}
              price={course.price!}
              category={course.category?.name!}
              description={course.description!}
              avg={course.totalStars! / course.totalReviews!}
              totalReviews={course.totalReviews!}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TeacherCourses;
