"use client";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartsjs, ArcElement } from "chart.js";
import {
  getLevelDistinctCount,
  getTheoriginofsubscriptionuser,
} from "@/actions/dashboard/fetch_donuts_chart";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

Chartsjs.register(ArcElement);

interface Props {
  level: Awaited<ReturnType<typeof getLevelDistinctCount>>;
  users: Awaited<ReturnType<typeof getTheoriginofsubscriptionuser>>;
}

function AdminDonutscharts({ level, users }: Props) {
  const [userData, setUserData] = useState(false);
  const data = {
    labels: userData ? users?.map((u) => u.region) : level?.map((l) => l.level),
    datasets: [
      {
        label: userData ? "User Data" : "Course Data",
        data: userData
          ? users?.map((u) => u.userCount)
          : level?.map((l) => l.levelCount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{userData ? "User Data" : "Course Skill Level"}</CardTitle>
        <CardDescription>
          {userData
            ? "User Data distribution based on their region."
            : "Courses skill level distribution."}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div>
            <Badge
              variant={"outline"}
              className="text-sm cursor-pointer"
              onClick={() => {
                setUserData(true);
              }}
            >
              User Data
            </Badge>
          </div>
          <div>
            <Badge
              variant={"outline"}
              className="text-sm cursor-pointer"
              onClick={() => {
                setUserData(false);
              }}
            >
              Course Data
            </Badge>
          </div>
        </div>
      </CardHeader>

      <div className="h-[30vh] flex justify-center">
        <Doughnut data={data} />
      </div>
    </Card>
  );
}

export default AdminDonutscharts;
