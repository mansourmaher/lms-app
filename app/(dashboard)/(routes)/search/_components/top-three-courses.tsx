import { getTop3Courses } from "@/actions/course/get-top-5-courses";
import { CourseCard } from "@/components/course-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const TopThreeCourses = async () => {
  const topThreeCourses = await getTop3Courses();

  return (
    <div className="">
      <div className="m-8">
        <p className="text-2xl font-bold mb-8">
          Recommendation Courses for you
        </p>
        <div className="mb-6">
          <span>
            Here are a few courses we think you will liked base on here Rating
            and Reviews
            <br />
            Other student with similar interest have found these courses helpful
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {topThreeCourses.slice(0, 5).map((course) => (
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

        {/* <Carousel>
          <CarouselContent>
            {topThreeCourses.slice(2, 5).map((course) => (
              <CarouselItem key={course.id}>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="mr-8" />
          <CarouselNext className="right-0" />
        </Carousel> */}
      </div>
    </div>
  );
};
export default TopThreeCourses;
