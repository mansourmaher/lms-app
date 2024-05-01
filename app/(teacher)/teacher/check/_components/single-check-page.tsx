import { getAllEtudiantWithCompteRendu } from "@/actions/teacher/get-all-etduiant-with-compte-rendu";
import { columns } from "./table-user/columns";
import { DataTable } from "./table-user/data-table";
import { Activity, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getthebeststudentinthe5bestcourse } from "@/actions/teacher/getthebeststudentinthebest5course";
import TopstudentCard from "./topstudentcard";

interface SingleCheckPageProps {
  usersWork: Awaited<ReturnType<typeof getAllEtudiantWithCompteRendu>>;
  topstudent: Awaited<ReturnType<typeof getthebeststudentinthe5bestcourse>>;
}

export default function SingleCheckPage({
  usersWork,
  topstudent,
}: SingleCheckPageProps) {
  return (
    <div className="flex max-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="flex gap-x-2">
                  <FileText className="h-6 w-6 text-sky-500" />
                  <span className="text-sky-500">Student Compte Rendu</span>
                </CardTitle>
                <CardDescription>
                  Recent Compte Rendu from students
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable data={usersWork} columns={columns} />
            </CardContent>
          </Card>
          <TopstudentCard topstudent={topstudent} />
        </div>
      </main>
    </div>
  );
}
{
  /* <DataTable data={usersWork} columns={columns} /> */
}
