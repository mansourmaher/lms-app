"use client";
import {
  getFivestarscount,
  getForstarscount,
  getOnetarscount,
  getThreestarscount,
  getTwostarscount,
} from "@/actions/course/get-stars-number";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CourseReview } from "@prisma/client";
import { BarChartBigIcon } from "lucide-react";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  courseId: string | undefined;
}

export default function ReviewProgress({ courseId }: Props) {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [fivestars, setFivestars] = React.useState<number>(0);
  const [fourstars, setFourstars] = React.useState<number>(0);
  const [threestars, setThreestars] = React.useState<number>(0);
  const [twostars, setTwostars] = React.useState<number>(0);
  const [onestars, setOnestars] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [percentageoffivestars, setPercentageoffivestars] =
    React.useState<number>(0);
  const [percentageoffourstars, setPercentageoffourstars] =
    React.useState<number>(0);
  const [percentageofthreestars, setPercentageofthreestars] =
    React.useState<number>(0);
  const [percentageoftwostars, setPercentageoftwostars] =
    React.useState<number>(0);
  const [percentageofonestars, setPercentageofonestars] =
    React.useState<number>(0);
  const [average, setAverage] = React.useState<number>(0);
  const [loadingState, setLoadingState] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState(true);

        const fivestarsCount = await getFivestarscount(courseId as string);
        setFivestars(fivestarsCount);

        const fourstarsCount = await getForstarscount(courseId as string);
        setFourstars(fourstarsCount);

        const threestarsCount = await getThreestarscount(courseId as string);
        setThreestars(threestarsCount);

        const twostarsCount = await getTwostarscount(courseId as string);
        setTwostars(twostarsCount);

        const onestarsCount = await getOnetarscount(courseId as string);
        setOnestars(onestarsCount);

        const calculatedTotal =
          fivestarsCount +
          fourstarsCount +
          threestarsCount +
          twostarsCount +
          onestarsCount;
        setTotal(calculatedTotal);

        setPercentageoffivestars(
          Math.round((fivestarsCount / calculatedTotal) * 100)
        );
        setPercentageoffourstars(
          Math.round((fourstarsCount / calculatedTotal) * 100)
        );
        setPercentageofthreestars(
          Math.round((threestarsCount / calculatedTotal) * 100)
        );
        setPercentageoftwostars(
          Math.round((twostarsCount / calculatedTotal) * 100)
        );
        setPercentageofonestars(
          Math.round((onestarsCount / calculatedTotal) * 100)
        );

        const calculatedAverage =
          (fivestarsCount * 5 +
            fourstarsCount * 4 +
            threestarsCount * 3 +
            twostarsCount * 2 +
            onestarsCount) /
          calculatedTotal;
        setAverage(calculatedAverage);

        setLoadingState(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingState(false);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <>
      {!loadingState ? (
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer w-auto " asChild>
            <div className="flex justify-between items-center ">
              <div className="flex mt-4 ">
                <div className="flex   mb-4">
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <div
                        key={currentRating}
                        className="flex flex-row space-x-2"
                      >
                        <label>
                          <input
                            type="radio"
                            name="rate"
                            value={currentRating}
                            checked={average === currentRating}
                            readOnly
                            className="hidden"
                          />
                          <FaStar
                            className={cn(
                              "text-2xl",
                              average >= currentRating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            )}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>

                <p>
                  {Number.isNaN(average) ? null : <> ({average.toFixed(1)})</>}
                </p>
              </div>

              <div>
                <p> ({total} Review) </p>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {total !== 0 && (
              <div className="flex  mb-4">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <div
                      key={currentRating}
                      className="flex flex-row space-x-2"
                    >
                      <label>
                        <input
                          type="radio"
                          name="rate"
                          value={currentRating}
                          checked={average === currentRating}
                          readOnly
                          className="hidden"
                        />
                        <FaStar
                          className={cn(
                            "text-2xl",
                            average >= currentRating
                              ? "text-yellow-400"
                              : "text-gray-400"
                          )}
                        />
                      </label>
                    </div>
                  );
                })}

                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {average.toFixed(1)}
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  out of
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5
                </p>
              </div>
            )}

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {total} global ratings
            </p>
            {total == 0 ? (
              <p>No ratings yet</p>
            ) : (
              <>
                <div className="flex items-center mt-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    5 star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${percentageoffivestars}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {percentageoffivestars}%{" "}
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    4 star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${percentageoffourstars}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {percentageoffourstars}%{""}
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    3 star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${percentageofthreestars}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {percentageofthreestars}%{""}
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    2 star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${percentageoftwostars}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {percentageoftwostars}%{""}
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    1 star
                  </a>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-300 rounded"
                      style={{ width: `${percentageofonestars}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {percentageofonestars}%{""}
                  </span>
                </div>
              </>
            )}
          </HoverCardContent>
        </HoverCard>
      ) : (
        <div className="">
          <Skeleton className="w-[400px] h-6" />
        </div>
      )}
    </>
  );
}
