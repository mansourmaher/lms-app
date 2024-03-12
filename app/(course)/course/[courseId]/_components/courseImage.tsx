import React from "react";

interface CourseImageProps {
  img: string;
}

export default function CourseImage({ img }: CourseImageProps) {
  return (
    <div className="m-8 space-y-6">
      <div className="text-2xl font-bold">
        the title of the courses will display here
      </div>
      <div>
        <img
          src={img}
          alt="course image"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
