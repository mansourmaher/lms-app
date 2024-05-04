import { ConversationsList } from "./_components/conversation_list";
import { getTeacherConversations } from "@/actions/conversation/getteacherconversations";
import Image from "next/image";
import { auth } from "@/auth";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  // const community = await getAllCommunity();
  // const user = await auth();
  // const isverifiedteacher =
  //   user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  const conversation = await getTeacherConversations();
  const user = await auth();
  const isaverifiredteacher =
    user?.user.role == "TEACHER" && user?.user.teacherAccess == true;
  if (!isaverifiredteacher) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/error_401.jpg" width={900} height={900} alt="error" />
      </div>
    );
  }
  return (
    <div className="h-full">
      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar community={community} isverifiedteacher={isverifiedteacher} />
      </div> */}
      <ConversationsList conversations={conversation} />

      <div className=" h-full flex flex-col  ">{children}</div>
    </div>
  );
};
export default LayoutPage;
