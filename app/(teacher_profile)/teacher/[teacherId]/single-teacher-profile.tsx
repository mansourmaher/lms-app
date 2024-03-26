import TeacherProfile from "./_components/teacherProfile";
import TeacherCourses from "./_components/teacher-courses";
import { getTeacherById } from "@/actions/teacher/get-teacher-byId";
import { get } from "http";
import { getCoursesBytecaher } from "@/actions/course/get-teacher-courses";
import TeacherProfileHeader from "./_components/teacher-profile-header";

interface SingleTeacherProfileProps {
  teacher: Awaited<ReturnType<typeof getTeacherById>>;
  teacherId: string;
}

const SingleTeacherProfile = async ({
  teacher,
  teacherId,
}: SingleTeacherProfileProps) => {
  const courses = await getCoursesBytecaher(teacherId);
  return (
    <div>
      <div>
        <TeacherProfileHeader teacherName={teacher.name!} />
        <TeacherProfile teacher={teacher} />
        <div className="space-y-2 px-8">
          <h2 className="text-1xl font-bold">Discover my courses</h2>
          <span>
            Start learning with me and discover my courses that will help you
            improve your skills
          </span>

          <TeacherCourses courses={courses} />
        </div>
      </div>
    </div>
  );
};
export default SingleTeacherProfile;
