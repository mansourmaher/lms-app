import { getTeacherWithCoursesCount } from "@/actions/Etudiant/get-teacher-name";
import { getCoursesNameAndImage } from "@/actions/course/get-courses-image-name";
import React from "react";
import SearchModal from "./searchModal";

const SearchModalTrigger = async () => {
  const courses = await getCoursesNameAndImage();
  const teacher = await getTeacherWithCoursesCount();
  return (
    <>
      <SearchModal courses={courses} teacher={teacher} />
    </>
  );
};

export default SearchModalTrigger;
