import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import {
  getPublisedcourse,
  getTeacherrevenue,
  getToatalSubscribtion,
  getUnPublisedcourse,
  totalacceptedcourssincludemonthlyincrease,
} from "@/actions/dashboard/getteacherrevenue";

const DashboardCard = async () => {
  const revenue = await getTeacherrevenue(); //mrigla
  const subscribtion = await getToatalSubscribtion();
  const publisedcourse = await getPublisedcourse();
  const unpublishedcourse = await getUnPublisedcourse();
  const courses=await totalacceptedcourssincludemonthlyincrease()

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${revenue.revenue}</div>
          <p className="text-xs text-muted-foreground">
            +{Math.round(revenue.percentage * 0.1)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            +{subscribtion.totalSubscribtion}
          </div>
          <p className="text-xs text-muted-foreground">
            +{Math.round(subscribtion.percentage * 0.1)}% from last month{" "}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Active Courses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{courses.total}</div>
          <p className="text-xs text-muted-foreground">
            {courses.increase}% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Inactive Courses
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unpublishedcourse}</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;
