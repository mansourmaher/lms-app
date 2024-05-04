import { getAllMeetings } from "@/actions/system/get-all-live";
import React from "react";
import SingleLiveMeeting from "./singlelivemeeting";

const Page = async () => {
  const meets = await getAllMeetings();

  return (
    <>
      <SingleLiveMeeting meet={meets} />
    </>
  );
};

export default Page;
