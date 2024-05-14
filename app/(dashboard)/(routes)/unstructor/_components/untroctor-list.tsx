import React from "react";
import UnstroctorCard from "./untroctor-card";
import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";

interface UntroctorListProps {
  teachers: Awaited<ReturnType<typeof getAllUnstroctor>>;
}

export default function UntroctorList({ teachers }: UntroctorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 ">
      {teachers.map((teacher, index) => (
        <div key={index}>
          <UnstroctorCard teachers={teacher} index={index} />
        </div>
      ))}
      {/* {teachers.map((teacher, index) => (
        <div key={index}>
          <UnstroctorCard teachers={teacher} index={index} />
        </div>
      ))} */}
    </div>
  );
}
