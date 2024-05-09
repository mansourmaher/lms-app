import { getMyconversation } from "@/actions/conversation/getmyconversation";
import { ConversationsList } from "@/app/(teacher_conversations)/teacher_conversations/(conversation)/conversations/_components/conversation_list";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  // const community = await getAllCommunity();
  // const user = await auth();
  // const isverifiedteacher =
  //   user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  const conversation = await getMyconversation();
  return (
    <div className="h-full">
      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar community={community} isverifiedteacher={isverifiedteacher} />
      </div> */}
      <ConversationsList conversations={conversation} />

      <div className="md:pl-80 h-full  mx-auto ">{children}</div>
    </div>
  );
};
export default LayoutPage;
