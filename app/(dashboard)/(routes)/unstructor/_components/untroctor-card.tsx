import { get_all_unstroctor } from "@/actions/teacher/get-all-unstroctor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon, StarIcon } from "lucide-react";
import React from "react";

interface UnstroctorCardProps {
  teachers: Awaited<ReturnType<typeof get_all_unstroctor>>[0];
}
export default function UnstroctorCard({ teachers }: UnstroctorCardProps) {
  return (
    <div>
      <div className=" space-x-4  p-4">
        <Card className="w-[250px]">
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-40 h-40 p-2">
                <AvatarImage
                  alt="Profile picture"
                  src={teachers.user?.image || "/images/avatar-placeholder.png"}
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
