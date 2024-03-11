import { getAllEtudiantWithCompteRendu } from "@/actions/teacher/get-all-etduiant-with-compte-rendu";
import React from "react";
import { columns } from "./table-user/columns";
import { DataTable } from "./table-user/data-table";
import PdfModal from "./pdf-modal";

interface SingleCheckPageProps {
  usersWork: Awaited<ReturnType<typeof getAllEtudiantWithCompteRendu>>;
}

export default function SingleCheckPage({ usersWork }: SingleCheckPageProps) {
  console.log(usersWork);
  return (
    <div className="px-6 py-6">
      <DataTable data={usersWork} columns={columns} />
      
    </div>
  );
}
