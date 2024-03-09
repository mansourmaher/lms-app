import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search_input";
import { getCourses } from "@/actions/course/get-courses";
import { auth } from "@/auth";
import { CoursesList } from "@/components/courses-list";
import TopThreeCourses from "./_components/top-three-courses";
import { getTop3Courses } from "@/actions/course/get-top-5-courses";

export const dynamic = "force-dynamic";

interface getCoursesParams {
  title?: string;
  category?: string;
}

interface SearchPageProps {
  searchParams: getCoursesParams;
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const user = await auth();
  const userId = user?.user.id as string;

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    title: searchParams.title!,
    category: searchParams.category!,
  });
  // const topThreeCourses = await getTop3Courses();
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-6 ">
        <Categories items={categories} />
        {/* <TopThreeCourses items={topThreeCourses} /> */}
        {!courses ? (
          <div>
            <h1>No courses found</h1>
          </div>
        ) : (
          <CoursesList items={courses} />
        )}
      </div>
    </>
  );
};

export default SearchPage;
