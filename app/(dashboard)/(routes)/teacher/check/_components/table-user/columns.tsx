"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllEtudiantWithCompteRendu } from "@/actions/teacher/get-all-etduiant-with-compte-rendu";
import PdfModal from "../pdf-modal";

const columnHelper =
  createColumnHelper<
    Awaited<ReturnType<typeof getAllEtudiantWithCompteRendu>>
  >();

export const columns = [
  //@ts-ignore
  columnHelper.accessor((row) => row.user.email, {
    id: "student",
    header: "Student",

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
  columnHelper.accessor((row) => row.course.title, {
    id: "course_title",
    header: "Course Title",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row.chapter.title, {
    id: "chapter_title",
    header: "Chapter Title",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">
              {/*@ts-ignore*/}
              {info.row.original.chapter.title}
            </div>
            <div className="text-xs text-gray-500"></div>
          </div>
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
  columnHelper.accessor((row) => row, {
    id: "Work",
    header: "Work",
    cell: (info) => {
      return (
        <div className="flex flex-col space-y-1">
          <PdfModal
            //@ts-ignore
            info={info.row.original.workUrl}
            //@ts-ignore
            work={info.row.original.work}
            //@ts-ignore
            id={info.row.original.id}
          />
          <div className="text-xs text-gray-500">
            <div className="flex  ml-3 ">
              Publised At {/*@ts-ignore*/}
              {format(info.row.original.createdAt, "dd/MM/yyyy")}
            </div>
          </div>
        </div>
      );
    },
  }),
  //@ts-ignore
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">
              {/*@ts-ignore*/}
              {info.row.original.status === "pending" ? (
                <Badge variant="destructive">Pending</Badge>
              ) : (
                <Badge variant="green">Validated</Badge>
              )}
            </div>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
];
