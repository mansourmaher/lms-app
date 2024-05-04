import { getAllMeetings } from "@/actions/system/get-all-live";
import React from "react";
import Livecard from "./_componets/live-card";

interface SingleLiveMeetingProps {
  meet: Awaited<ReturnType<typeof getAllMeetings>>;
}

function SingleLiveMeeting({ meet }: SingleLiveMeetingProps) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-6">
        {meet.map((meeting) => (
          <Livecard key={meeting.id} id={meeting.id} />
        ))}
      </div>
    </div>
  );
}

export default SingleLiveMeeting;
