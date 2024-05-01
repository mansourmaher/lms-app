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
import { Badge } from "@/components/ui/badge";

interface TopstudentCardProps {
  topstudent: Awaited<ReturnType<typeof getthebeststudentinthe5bestcourse>>;
}

function TopstudentCard({ topstudent }: TopstudentCardProps) {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          <Activity className="h-6 w-6 text-sky-500" />
          <span className="text-sky-500">Student Classemnt</span>
        </CardTitle>
        <CardDescription>
          We dispaly the best student in each course
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        {topstudent?.map((student, index) => (
          <div className="flex items-center gap-4" key={index}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src={student.image} alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            <div className="ml-auto font-medium flex flex-col gap-y-2">
              <span className="text-sm text-muted-foreground flex gap-x-1">
                <span>Score:</span>{" "}
                <span className="text-semibold text-black">{student.score}</span>
              </span>
              <span>
                <Badge className="bg-sky-500 text-white">
                  {student.course}
                </Badge>
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default TopstudentCard;
