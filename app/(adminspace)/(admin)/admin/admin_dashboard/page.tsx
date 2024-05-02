import DashboardCard from "@/app/(teacherdashbord)/teacher_dashbord/_componets/dashbord_card";
import CourseChart from "@/app/(teacherdashbord)/teacher_dashbord/_componets/course_fetchdata";
import FetchDonutsData from "@/app/(teacherdashbord)/teacher_dashbord/_componets/fetch_donuts_data";
import AdminDashbordCard from "@/app/(adminspace)/_components/admindashordCard";
import AdminCourseChart from "@/app/(adminspace)/_components/admincoursechart";

export default function Page() {
  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <AdminDashbordCard />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <AdminCourseChart />
          <FetchDonutsData />
        </div>
      </main>
    </div>
  );
}
