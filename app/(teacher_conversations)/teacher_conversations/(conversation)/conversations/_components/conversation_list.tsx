"use client";
import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { ConversationsListItem } from "./conversationListItem";
import { Edit, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

interface ConversationsListProps {
  conversations: Awaited<ReturnType<typeof getMyconversation>>;
}

export function ConversationsList({ conversations }: ConversationsListProps) {
  const [searchValue, setSearchValue] = React.useState("");
  const [filtredconv, setFiltredconv] = React.useState(conversations);

  useEffect(() => {
    const filtredconv = conversations.filter((teacher) =>
      teacher?.title?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFiltredconv(filtredconv);
    console.log(filtredconv);
  }, [searchValue]);

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-full overflow-y-auto border-r pb-20  lg:block lg:w-80 lg:pb-0">
      <div className="">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-foreground text-center flex justify-center">
            <span className="flex  items-center ">
              <Edit className="inline-block mr-2 text-sky-500" />
              Conversations 
            </span>
          </div>
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md mx-2 mb-4">
            <SearchIcon className="text-gray-400" />
            <Input
              className="bg-transparent flex-1 border-none focus:ring-0"
              placeholder="Find Conversations"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 overflow-y-auto">
          {filtredconv.map((conversation) => (
            <ConversationsListItem key={conversation.id} data={conversation} />
          ))}
        </div>
      </div>
    </aside>
  );
}
