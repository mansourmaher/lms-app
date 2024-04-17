"use client";
import { getAllUnstroctor } from "@/actions/teacher/get-all-unstroctor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface UnstroctorCardProps {
  teachers: Awaited<ReturnType<typeof getAllUnstroctor>>[0];
  index: number;
}
export default function UnstroctorCard({
  teachers,
  index,
}: UnstroctorCardProps) {
  const router = useRouter();
  return (
    <div>
      <div className=" space-x-4  p-4">
        <Card
          className="w-[250px] hover:bg-slate-100 cursor-pointer "
          onClick={() => router.push(`/teacher/${teachers.user?.id}`)}
        >
          <CardContent>
            <div className="flex   justify-end">
              {index === 0 && (
                <img
                  // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                  src="/firstmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {index === 1 && (
                <img
                  // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                  src="/secondmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {index === 2 && (
                <img
                  // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                  src="/thirdmeaille.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
              {index > 2 && (
                <img
                  // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                  src="/stars.jpg"
                  width={50}
                  height={50}
                  alt="first"
                  loading="lazy"
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-40 h-40 p-2">
                <AvatarImage
                  alt="Profile picture"
                  src={teachers.user?.image || "/images/avatar-placeholder.png"}
                  loading="lazy"
                />
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {teachers.user?.name || "No Name"}
                </p>
                <p className="text-sm text-gray-600">
                  {teachers.user?.subtitle || "No subtitle"}
                </p>
                <div className="flex items-center mt-1 justify-between m-1 gap-x-10">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="text-yellow-400" />
                    <p className="text-sm font-medium ml-1">
                      {teachers.avg.toFixed(2)}
                    </p>
                  </div>
                  <div>{teachers.totalReviews} Reviews</div>
                </div>

                <p className="text-sm">{teachers.totlaPurchase} participants</p>
                <p className="text-sm">{teachers.totlacourse} cours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
