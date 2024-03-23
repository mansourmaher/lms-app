import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";
import Bannner from "./banner";
import { getCourses } from "@/actions/course/get-courses";

interface CoursesListProps {
  items: Awaited<ReturnType<typeof getCourses>>;
}
export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {items.map((course) => (
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
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-smaill mt-10">No courses found</div>
      )}
    </div>
  );
};
