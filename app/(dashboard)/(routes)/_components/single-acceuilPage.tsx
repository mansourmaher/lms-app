import { auth } from "@/auth";
import React from "react";
import CourseStudentList from "./course-students-list";

const SingleAcceuilPage = async () => {
  const user = await auth();

  return (
    <div>
      <div className="bg-white">
        <div className="text-sky-700 bg-sky-400/30 hover:bg-sky-200">
          <div className="max-w-5xl px-24 py-6  ">
            <h1 className="text-4xl font-bold">
              Wellcome back, {user?.user.name}!
            </h1>
            <p className="mt-2 text-xl">
              You are now logged in. You can start learning right away.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Your last courses progress
          </h2>
        </div>
      </div>
      <div>
        <CourseStudentList />
      </div>
    </div>
  );
};

export default SingleAcceuilPage;
