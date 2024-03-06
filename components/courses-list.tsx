import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithTypeWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};
interface CoursesListProps {
  items: CourseWithTypeWithProgressWithCategory[];
}
export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-smaill mt-10">No courses found</div>
      )}
    </div>
  );
};
