import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search_input";
import { getCourses } from "@/actions/course/get-courses";
import { auth } from "@/auth";
import { CoursesList } from "@/components/courses-list";

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
    userId: userId,
    title: searchParams.title!,
    category: searchParams.category!,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-6 ">
        <Categories items={categories} />

        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
