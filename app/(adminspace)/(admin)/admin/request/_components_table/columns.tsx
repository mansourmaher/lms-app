"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllEtudiantWithCompteRendu } from "@/actions/teacher/get-all-etduiant-with-compte-rendu";
import PdfModal from "./pdf-modal";
import { getAllTeacherRequest } from "@/actions/admin/get-all-teacher-request";

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof getAllTeacherRequest>>>();

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
  columnHelper.accessor((row) => row, {
    id: "Created At",
    header: "Joined At",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">{/*@ts-ignore*/}</div>
            <div className="text-xs text-gray-500">
              <div className="flex  space-x-2">
                {/*@ts-ignore*/}
                {format(info.row.original.createdAt, "dd/MM/yyyy")}
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
  columnHelper.accessor((row) => row.title, {
    id: "chapter_title",
    header: "Document",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">
              {/*@ts-ignore*/}
              <PdfModal
                //@ts-ignore
                info={info.row.original.url}
                //@ts-ignore
                work={info.row.original.title}
                //@ts-ignore
                id={info.row.original.user.id}
                //@ts-ignore
                isvalidyet={info.row.original.status === "Validated"}
              />
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
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: "Status",
    cell: (info) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium ">
              {/*@ts-ignore*/}
              {info.row.original.status === "pending" && (
                <Badge variant="yellow">Pending</Badge>
              )}
              {/*@ts-ignore*/}
              {info.row.original.status === "Validated" && (
                <Badge variant="green">Validated</Badge>
              )}
              {/*@ts-ignore*/}
              {info.row.original.status === "rejected" && (
                <Badge variant="destructive">Rejected</Badge>
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
