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
    <div className="p-4 bg-white flex flex-col border rounded-lg">
      <div className="relative w-full aspect-video rounded-xl mb-4">
        <Image
          className=" w-full object-cover rounded-xl"
          src={imageUrl}
          alt="Course Image"
          fill
        />
      </div>
      <hr className="border-t border-muted-foreground mb-4" />

      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1.5  line-clamp-3 h-14 mb-6">
        {description}
      </p>
      <div className="flex flex-row justify-between items-center mt-3">
        <div className=" -mx-1">
          <Badge variant="yellow" className="mr-2">{category}</Badge>
        </div>

        <div className=" -mx-1">
          <Badge variant="outline">
            <BookOpen size={14} className="mr-2" />
            {chapterLenght} chapters
          </Badge>
        </div>
        <Badge variant="primary">
          <DollarSign size={14} className="mr-2" />
          {price} D
        </Badge>
        <Badge variant="green" className="mr-2">
          <ReviewProgress courseId={id} />
        </Badge>
      </div>
      <div></div>
      <div className="flex justify-between items-center">
        <div className="mt-6 ">
          <Button variant={"primary"}>
            <Link href={`/course/${id}`} className="flex items-center gap-x-3 ">
              <Eye size={18} /> View Course
            </Link>
          </Button>
        </div>
        <div className="mt-6 ">
          <PurchaseButton courseId={id} userId={userId}/>
        </div>
      </div>
    </div>
  );
};
