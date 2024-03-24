import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";
import SingleUnstructorsPage from "./_components/single-unstructors-page";

interface GetTeacher {
  teacher: string;
}
interface PageProps {
  searchParams: GetTeacher;
}

const Page = async ({ searchParams }: PageProps) => {
  const teachers = await getAllUnstroctor(searchParams.teacher);

  return (
    <div>
      <SingleUnstructorsPage teachers={teachers} />
    </div>
  );
};
export default Page;
