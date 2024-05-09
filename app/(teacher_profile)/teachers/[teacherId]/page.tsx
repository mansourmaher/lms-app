import { getTeacherById } from "@/actions/teacher/get-teacher-byId";
import SingleTeacherProfile from "./single-teacher-profile";


const Page = async ({
  params,
}: {
  params: {
    teacherId: string;
  };
}) => {
  const teacherId = params.teacherId;
  const teacher = await getTeacherById(teacherId);
  return <SingleTeacherProfile teacher={teacher} teacherId={teacherId} />;
};

export default Page;
