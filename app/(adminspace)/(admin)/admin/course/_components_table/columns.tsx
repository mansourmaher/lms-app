"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PdfModal from "./pdf-modal";
import { getAllCourseRequest } from "@/actions/admin/get-all-course-request";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RejectCourse from "../../courserequest/_components/reject-course";
import BlockeCourse from "../_componnets/unpublishcourse";

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllCourseRequest>>>();

export const columns = [
  //@ts-ignore
  columnHelper.accessor((row) => row.user.email, {
    id: "teacher",
    header: "Teacher",

    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5 w-50">
          <Avatar className="h-8 w-8 ">
            <AvatarImage
              className="rounded-full"
              src={
                //@ts-ignore
                info.row.original.user.image ? info.row.original.user.image : ""
              }
            />
            <AvatarFallback className="uppercase">
              {/*@ts-ignore*/}
              {info.row.original.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">
              {/*@ts-ignore*/}
              {info.row.original.user.name}
            </div>

            <div className="text-xs text-gray-500">
              {/*@ts-ignore*/}
              {info.row.original.user.email}
            </div>
          </div>
        </div>
      );
    },
  }),

  //@ts-ignore
  columnHelper.accessor((row) => row.title, {
    id: "Course Title",
    header: "Course_Title",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">
              {/*@ts-ignore*/}
              {info.row.original.title}
            </div>
          </div>
          <div className="text-xs text-gray-500"></div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row.category.name, {
    id: "Category",
    header: "Category",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">
              {/*@ts-ignore*/}
              {info.row.original.category.name}
            </div>
          </div>
          <div className="text-xs text-gray-500"></div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "Chapter Count",
    header: "Chapter Count",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">
              {/*@ts-ignore*/}
              {info.row.original.chapters.length}
            </div>
          </div>
          <div className="text-xs text-gray-500"></div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "Created At",
    header: "Published At",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">{/*@ts-ignore*/}</div>
            <div className="text-xs text-gray-500">
              <div className="flex  space-x-2">
                Publised At {/*@ts-ignore*/}
                {format(info.row.original.createdAt, "dd/MM/yyyy")}
              </div>
            </div>
          </div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "Status",
    header: "Status",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">
              {/*@ts-ignore*/}
              {info.row.original.status === "verified" && (
                <div className="flex items-center gap-x-2.5">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Verified</span>
                </div>
              )}
              {/*@ts-ignore*/}
              {info.row.original.status === "blocked" && (
                <div className="flex items-center gap-x-2.5">
                  <X className="h-5 w-5 text-red-500" />
                  <span>Blocked</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-500"></div>
        </div>
      );
    },
  }),

  //@ts-ignore

  //@ts-ignore

  //@ts-ignore
  // columnHelper.accessor((row) => row.createdAt, {
  //   id: "Deposited At",
  //   header: "Deposited At",
  //   cell: (info) => format(info.getValue(), "dd/MM/yyyy"),
  // }),
  //@ts-ignore
  // columnHelper.accessor((row) => row, {
  //   id: "Work",
  //   header: "Work",
  //   cell: (info) => {
  //     return (
  //       <div className="flex flex-col space-y-1">
  //         <PdfModal
  //           //@ts-ignore
  //           info={info.row.original.workUrl}
  //           //@ts-ignore
  //           work={info.row.original.work}
  //           //@ts-ignore
  //           id={info.row.original.id}
  //         />
  //         <div className="text-xs text-gray-500">
  //           <div className="flex  ml-3 ">
  //             Publised At {/*@ts-ignore*/}
  //             {format(info.row.original.createdAt, "dd/MM/yyyy")}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   },
  // }),
  //@ts-ignore
  columnHelper.accessor((row) => row, {
    id: "Actions",
    header: "Actions",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5 cursor-pointer">
          {/*@ts-ignore*/}
          {/* <ViewCourseDetail id={info.row.original.id} /> */}
          {/*@ts-ignore*/}
          {info.row.original.status === "verified" && (
            //@ts-ignore
            <BlockeCourse id={info.row.original.id} />
          )}
          {/*@ts-ignore*/}
          {info.row.original.status === "blocked" && (
            <Button
              variant="primary"
              size={"sm"}
              onClick={() => {
                console.log("Blocked");
              }}
              className="flex gap-x-2"
            >
              {/*@ts-ignore*/}
              <CheckCircle size={16} />
              Unblock
            </Button>
          )}

          {/* You can add more actions as needed */}
        </div>
      );
    },
  }),
];
