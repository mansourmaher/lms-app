import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import ReviewProgress from "@/app/(course)/course/[courseId]/_components/course-review-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLenght: number;
  price: number;
  progress: number;
  category: string;
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chapterLenght,
  price,
  progress,
  category,
}: CourseCardProps) => {
  return (
    <div>
      <Link href={`/course/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p- h-full">
          <div className="relative w-full aspect-video rounded-md">
            <Image
              fill
              className="object-cover"
              alt={title}
              src={imageUrl}
            ></Image>
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
              {title}
            </div>
            <p className="text-sm md:text-xs text-gray-500 line-clamp-1">
              {category}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge icon={BookOpen} size="sm" />
                <span>{chapterLenght} chapters</span>
              </div>
            </div>
            {progress !== null ? (
              <div>
                <div className="flex items-center gap-x-1 text-slate-500">
                  <IconBadge icon={BookOpen} size="sm" />
                  <span>{progress}% completed</span>
                </div>
              </div>
            ) : (
              <div className="text-sm md:text-xs text-slate-500">
                <span className="text-md md:text-sm font-medium text-slate-700">
                  {price}$
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
      <div>
        <hr />
        <ReviewProgress courseId={id} />
      </div>
    </div>
  );
};
