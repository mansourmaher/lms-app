import {
  getLevelDistinctCount,
  getTheoriginofsubscriptionuser,
} from "@/actions/dashboard/fetch_donuts_chart";
import React from "react";
import AdminDonutscharts from "./admindonutschart";

const FetchDonutsData = async () => {
  const levelcount = await getLevelDistinctCount();
  const users = await getTheoriginofsubscriptionuser();
  return (
    <>
      <AdminDonutscharts level={levelcount} users={users} />
    </>
  );
};

export default FetchDonutsData;
