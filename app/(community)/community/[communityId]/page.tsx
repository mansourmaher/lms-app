import { getPostsInCommunity } from "@/actions/community/get-posts-comunity-id";
import { ComunityUser } from "../_componets/comunity-users";
import ComunityPostList from "../_componets/comunity-posts-list";
import CommunitySearchProblem from "../_componets/comunity-search-problem";
import CommunityMessageInput from "../_componets/comunity-message-input";
import Message from "../_componets/message";
import CourseHedaer from "@/app/(course)/course/[courseId]/_components/course-header";
import CommunityHeader from "../_componets/community-breadkrumb";
import { getCommNameByid } from "@/actions/community/getCommunityName";
const Page = async (params: {
  params: {
    communityId: string;
  };
}) => {
  const extractedComunityIdandPostId = params.params.communityId.split("post");
  const comunityId = extractedComunityIdandPostId[0];
  const postId = extractedComunityIdandPostId[1];
  const posts = await getPostsInCommunity(comunityId);
  const communityName = await getCommNameByid(comunityId);
  return (
    <div className="max-h-full w-full">
      <div className="flex justify-between h-full w-full ">
        <div className="w-full">
          <CommunityHeader commName={communityName!} />
          <div className="border-b-2 mr-7 ml-6"></div>
          <div className="flex flex-col bg-gray-100 ">
            <div className="flex h-full">
              <div className="flex flex-col w-full px-6  space-y-2 bg-white">
                <CommunitySearchProblem />

                <div className="bg-gray-100 h-[580px] overflow-y-auto p-4 rounded-lg">
                  {posts.length === 0 && (
                    <div className="text-gray-500 my-auto flex mx-auto">
                      No posts yet in this community
                    </div>
                  )}
                  <ComunityPostList posts={posts} postId={postId} />
                </div>

                <Message communityId={comunityId!} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ComunityUser communityId={comunityId} />
        </div>
      </div>
    </div>
  );
};
export default Page;
