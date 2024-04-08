import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { getCourseIncludeProgresse } from "@/actions/teacher/get-all-course-include-progresse";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getCourseIncludeProgresse>>>();
  const getnbrChaptersCompleted = (progress:any, chapterCount:any) => {
    // Calculate the proportion of progress made (a value between 0 and 1)
    const progressProportion = progress / 100;
  
    // Calculate the number of chapters completed
    const completedChapters = Math.floor(progressProportion * chapterCount);
  
    return completedChapters;
  };

  

export const columns = [
  //@ts-ignore

  columnHelper.accessor((row) => row.course.title, {
    id: "course_title",
    header: "Course Title",

    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5  w-[180px]">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-semibold">
              {/*@ts-ignore*/}
              {info.row.original.course.title}
            </div>
            <div className="text-xs text-gray-500">
              <div className="flex  space-x-2">
                Publised At {/*@ts-ignore*/}
                {format(info.row.original.course.createdAt, "dd/MM/yyyy")}
              </div>
            </div>
          </div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row.createdAt, {
    id: "dateDebut",
    header: "Start date",
    cell: (info) => {
      return (
        <div className="text-xs ">
          {/*@ts-ignore*/}
          {new Date(info.row.original.createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  }),
  //@ts-ignore

  //@ts-ignore

  //@ts-ignore
  columnHelper.accessor((row) => row.user, {
    id: "student",
    header: "Student",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5 w-40">
          <Avatar className="h-10 w-10 ">
            <AvatarImage
              className="rounded-full"
              src={info.getValue()?.image || ""}
              alt={info.getValue()?.name!}
            />
            <AvatarFallback className="uppercase">
              {info.getValue()?.name![0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-semibold">{info.getValue()?.name}</div>
            <div className="text-xs text-gray-500">
              {info.getValue()?.email}
            </div>
          </div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row.progress, {
    id: "progress",
    header: "Progress",
    cell: (info) => {
      return (
        <div className="flex space-x-2 items-center w-60">
          <Progress value={info.getValue()} />
          <span className="text-xs">{Math.round(info.getValue()!)}%</span>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "chpatercpmpleted",
    header: "Completed",
    cell: (info) => {
      return (
        <div className="flex space-x-2 items-center ">
          {/*@ts-ignore*/}
          {getnbrChaptersCompleted( info.row.original.progress,info.row.original.course.chapters.length) === 0 && (
            <Badge variant="slate">First chapter</Badge>
          )}
          {/*@ts-ignore*/}
           {getnbrChaptersCompleted( info.row.original.progress,info.row.original.course.chapters.length) === info.row.original.course.chapters.length && (
            <Badge variant="primary">Completed</Badge>
          )}
          {/*@ts-ignore*/}
          {getnbrChaptersCompleted( info.row.original.progress,info.row.original.course.chapters.length) !== 0 && getnbrChaptersCompleted( info.row.original.progress,info.row.original.course.chapters.length) !== info.row.original.course.chapters.length && (
            <>
            {/*@ts-ignore*/}
            {getnbrChaptersCompleted( info.row.original.progress,info.row.original.course.chapters.length)}/{info.row.original.course.chapters.length} 

            
            </>
          )}
        </div>
      );
    },
  }),

  // columnHelper.accessor((row) => row.status, {
  //   id: "Completed",
  //   header: "Completed",
  //   cell: (info) => {
  //     return (
  //       <div className="flex space-x-2 items-center">
  //         <span>
  //           {/*@ts-ignore*/}
  //           {info.row.original.status === "Completed" && (
  //             <Badge variant="green">Completed</Badge>
  //           )}
  //           {/*@ts-ignore*/}
  //           {info.row.original.status === "In progress" && (
  //             <Badge variant="yellow">In progress</Badge>
  //           )}
  //           {/*@ts-ignore*/}
  //           {info.row.original.status === "Not started" && (
  //             <Badge variant="slate">Not started</Badge>
  //           )}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // }),
  //@ts-ignore
  // columnHelper.accessor((row) => row.classement, {
  //   id: "classement",
  //   header: "Classement",

  //   cell: (info) => {
  //     return (
  //       <div className="">
  //         <span className="text-xs w-3">
  //           {/*@ts-ignore*/}
  //           {info.row.original.classement === 0
  //             ? "-"
  //             : // @ts-ignore
  //               info.row.original.classement}
  //         </span>
  //       </div>
  //     );
  //   },
  // }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "score",
    header: "Points",

    cell: (info) => {
      return (
        <div className="">
          <span className="text-xs w-3">
            {/*@ts-ignore*/}
            {info.row.original.score === null
              ? "-"
              : // @ts-ignore
                info.row.original.score}
            {/*@ts-ignore*/}
            /{info.row.original.course.chapters.length * 20}
          </span>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "classment",
    header: "Classment",
    cell: (info) => {
      return (
        <>
          <div className="text-xs w-3">
            {/*@ts-ignore*/}
            {info.row.index + 1}
          </div>
        </>
      );
    },
  }),
];
