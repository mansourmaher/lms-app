import Image from "next/image";
import React from "react";

interface CourseImageProps {
  img: string;
}

export default function CourseImage({ img }: CourseImageProps) {
  return (
    <div className="m-8 space-y-6">
      {/* <div className="text-2xl font-bold">
        the title of the courses will display here
      </div> */}
      <div className="relative w-full h-[550px] aspect-video rounded-xl mb-4">
        <Image
          className=" w-full object-cover rounded-xl"
          src={img}
          alt="Course Image"
          fill
          loading="lazy"
        />
      </div>
    </div>
  );
}
