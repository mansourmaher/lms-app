
import React from "react";
import UnstroctorCard from "./untroctor-card";
import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";

interface UntroctorListProps {
  teachers: Awaited<ReturnType<typeof getAllUnstroctor>>;
}

export default function UntroctorList({ teachers }: UntroctorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
      {teachers.map((teacher) => (
        <div key="14">
          <UnstroctorCard teachers={teacher} />
        </div>
      ))}
    </div>
  );
}
