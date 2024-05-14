import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="m-8">
      <p className="text-2xl font-bold mb-8">Recommendation Teacher for you</p>
      <div className="mb-6">
        <span>
          Here are a few Formateur we think you will liked base on here Rating
          and Reviews
          <br />
          Other student with similar interest have found these courses helpful
        </span>
      </div>
      <div className="mx-16">
        <div className="grid grid-cols-3  gap-8 mt-12">
          {new Array(6).fill(0).map((_, i) => (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 "
              key={i}
            >
              <Card className="w-[250px] hover:bg-slate-100 cursor-pointer animate-plus">
                <CardContent>
                  <div className="flex   justify-end">
                    {i === 0 && (
                      <img
                        // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                        src="/firstmeaille.jpg"
                        width={50}
                        height={50}
                        alt="first"
                        loading="lazy"
                      />
                    )}
                    {i === 1 && (
                      <img
                        // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                        src="/secondmeaille.jpg"
                        width={50}
                        height={50}
                        alt="first"
                        loading="lazy"
                      />
                    )}
                    {i === 2 && (
                      <img
                        // the path=C:\Users\HP\Desktop\PFE\lms-app-2\public\firstmeaille.jpg
                        src="/thirdmeaille.jpg"
                        width={50}
                        height={50}
                        alt="first"
                        loading="lazy"
                      />
                    )}
                    {i > 2 && (
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
                        src={"/avatar.png"}
                        loading="lazy"
                      />
                    </Avatar>
                    <div className="text-center">
                      <p className="text-lg font-semibold"></p>
                      <p className="text-sm text-gray-600"></p>
                      <div className="flex items-center mt-1 justify-between m-1 gap-x-10">
                        <div className="flex items-center space-x-1">
                          <StarIcon className="text-yellow-400" />
                          <p className="text-sm font-medium ml-1">5.0/5.0</p>
                        </div>
                        <div> Reviews</div>
                      </div>

                      <p className="text-sm">participants</p>
                      <p className="text-sm"> cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
