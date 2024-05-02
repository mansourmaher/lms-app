"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as Chartsjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getMyStudentsIncludetheirageIncludetheircount,
  getTop5PurchasedCoursesByTeacher,
} from "@/actions/dashboard/gettop5coursebyteacher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

Chartsjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CourseBarchatProps {
  courses: Awaited<ReturnType<typeof getTop5PurchasedCoursesByTeacher>>;
  student: Awaited<
    ReturnType<typeof getMyStudentsIncludetheirageIncludetheircount>
  >;
}

function AdminCoursesBarChart({ courses, student }: CourseBarchatProps) {
  const [userData, setUserData] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: userData ? student.map((s) => s.age) : courses.map((c) => c.title),
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: userData ? "Age" : "Courses",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: userData ? "Student Count" : "Revenue",
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions({
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: userData ? "Age" : "Courses",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: userData ? "Student Count" : "Revenue",
          },
        },
      },
    });
    setChartData({
      labels: userData
        ? student.map((s) => s.age)
        : courses.map((c) => c.title),
      datasets: [
        {
          label: userData ? "Student Count" : "Revenue",
          data: userData
            ? student.map((s) => s.userCount)
            : courses.map((c) => c.revenue),
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
  }, [courses, student, userData]);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>
            {userData
              ? "We are Providing distribution of students by age"
              : " We are Providing the Top 7 courses  by sales"}
          </CardTitle>
        </div>
        <div className="flex items-center justify-between ml-auto gap-1">
          <Badge
            variant={"outline"}
            className="ml-auto gap-1 cursor-pointer"
            onClick={() => setUserData(false)}
          >
            Course Data
          </Badge>
          <Badge
            variant={"outline"}
            className="ml-auto gap-1 cursor-pointer"
            onClick={() => setUserData(true)}
          >
            Users Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full md:col-span-2 relative lg:h-[50vh] h-[30vh] m-auto p-4 border rounded-lg bg-white">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminCoursesBarChart;
/*<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Top 7 courses for you by sales</CardTitle>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <CourseChart />
            </CardContent>
          </Card>
          <div className="w-full md:col-span-2 relative lg:h-[50vh] h-[30vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
          */
