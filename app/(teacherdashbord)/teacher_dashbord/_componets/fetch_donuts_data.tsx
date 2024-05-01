import { getLevelDistinctCount, getTheoriginofsubscriptionuser } from "@/actions/dashboard/fetch_donuts_chart";
import React from "react";
import DonutsChart from "./donuts_chart";

const FetchDonutsData = async () => {
  const levelcount = await getLevelDistinctCount();
  const users=await getTheoriginofsubscriptionuser()
  return (
    <>
      <DonutsChart level={levelcount} users={users} />
    </>
  );
};

export default FetchDonutsData;
