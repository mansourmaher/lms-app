import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen, DollarSign, Eye } from "lucide-react";
import ReviewProgress from "@/app/(course)/course/[courseId]/_components/course-review-progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FaEyeSlash } from "react-icons/fa";
import { auth } from "@/auth";
import { purchaseCourse } from "@/actions/Etudiant/purchase-course";
import PurchaseButton from "@/app/(dashboard)/(routes)/search/_components/purchase-course-btn";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLenght: number;
  price: number;
  progress: number;
  category: string;
  description: string;
}

export const CourseCard =async ({
  id,
  title,
  imageUrl,
  chapterLenght,
  price,
  progress,
  category,
  description,
}: CourseCardProps) => {

  const user=await auth()
  const userId=user?.user.id as string


  const onclick = async (courseId:string) => {
    await purchaseCourse({courseId,userId})
  }
  return (
    <div className="p-4 bg-white flex flex-col border border-gray-300 rounded-lg shadow-lg">
    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt="Course Image"
      />
    </div>
    <hr className="border-t border-gray-400 mb-4" />
  
    <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
    <p className="text-sm text-gray-600 mt-1.5 line-clamp-3 h-14 mb-6">{description}</p>
    <div className="flex flex-wrap justify-between items-center mt-3">
      <div className="mb-2 md:mb-0">
        <span className="inline-flex items-center bg-gray-100 border border-gray-400 text-gray-800 px-2 py-1 rounded-md mr-2">{category}</span>
      </div>
      <div className="mb-2 md:mb-0">
        <span className="inline-flex items-center bg-gray-100 border border-gray-400 text-gray-800 px-2 py-1 rounded-md mr-2">
          <BookOpen size={14} className="mr-2" />
          {chapterLenght} chapters
        </span>
      </div>
      <div className="mb-2 md:mb-0">
        <span className="inline-flex items-center bg-gray-100 border border-gray-400 text-gray-800 px-2 py-1 rounded-md mr-2">
          <DollarSign size={14} className="mr-2" />
          {price} D
        </span>
      </div>
      <div>
        <span className="inline-flex items-center bg-green-400 text-gray-800 px-2 py-1 rounded-md mr-2">
          <ReviewProgress courseId={id} />
        </span>
      </div>
    </div>
    <div className="flex flex-wrap justify-between items-center mt-6">
      <div className="mb-2 md:mb-0">
        <Button variant="primary">
          <Link href={`/course/${id}`} className="flex items-center gap-x-3 text-white">
            <Eye size={18} /> View Course
          </Link>
        </Button>
      </div>
      <div>
        <PurchaseButton courseId={id} userId={userId}/>
      </div>
    </div>
  </div>
  );
};
