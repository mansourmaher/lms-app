import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourseBarchat from "./_componets/course_barchat";
import CourseChart from "./_componets/course_fetchdata";
import FetchDonutsData from "./_componets/fetch_donuts_data";
import { DialogDemo } from "@/app/room/[roomId]/_components/createroommodal";
import { UserButton } from "@/components/Auth/user-button";
import { Logo } from "@/app/(dashboard)/_components/logo";
import DashboardCard from "./_componets/dashbord_card";
import DonutsChart from "./_componets/donuts_chart";
export default function Page() {
  return (
    <div className="flex  w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DashboardCard />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <CourseChart />
          <FetchDonutsData />
        </div>
      </main>
    </div>
  );
}
