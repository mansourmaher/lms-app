import { getTheteacheroftheconversation } from "@/actions/conversation/gettheteacherofconversation";
import React from "react";
import OptionsComponets from "./options_compoents";

interface FetchtheoptionDataProps {
  conversationId: string;
}

const FetchtheoptionData = async ({
  conversationId,
}: FetchtheoptionDataProps) => {
  const data = await getTheteacheroftheconversation(conversationId);
  return (
    <>
      <OptionsComponets data={data} />
    </>
  );
};

export default FetchtheoptionData;
