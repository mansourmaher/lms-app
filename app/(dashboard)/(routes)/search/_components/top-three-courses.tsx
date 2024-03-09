import { getTop3Courses } from "@/actions/course/get-top-5-courses";
import { CourseCard } from "@/components/course-card";
import React from "react";

interface Props {
  items: Awaited<ReturnType<typeof getTop3Courses>>;
}

export default function TopThreeCourses({ items }: Props) {
  return (
    <div className="">
      <p className="text-2xl font-bold mb-8">Recommendation Courses for you</p>
      <div className="mb-6">

      
      <span >
        Here are a few courses we think you will liked base on here Rating and
        Reviews
        <br />
        Other student with similar interest have found these courses helpful
      </span>
      </div>
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
            avg={course.avg}
            totalReviews={course.totalReviews!}
          />
        ))}
      </div>
    </div>
  );
}
