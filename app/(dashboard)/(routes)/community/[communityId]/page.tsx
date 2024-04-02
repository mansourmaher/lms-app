import { getPostsInCommunity } from "@/actions/community/get-posts-comunity-id";
import { ComunityUser } from "../_componets/comunity-users";
import ComunityPostList from "../_componets/comunity-posts-list";
import CommunitySearchProblem from "../_componets/comunity-search-problem";
import CommunityMessageInput from "../_componets/comunity-message-input";
import Message from "../_componets/message";
const Page = async (params: {
  params: {
    communityId: string;
  };
}) => {
  const extractedComunityIdandPostId = params.params.communityId.split("post");
  console.log(extractedComunityIdandPostId);
  const comunityId = extractedComunityIdandPostId[0];
  const postId = extractedComunityIdandPostId[1];
  const posts = await getPostsInCommunity(comunityId);
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex h-full">
        <div className="flex flex-col w-full px-6  space-y-2 bg-white">
          <CommunitySearchProblem />
          {posts.length === 0 && (
            <div className="text-center text-gray-500">
              No posts yet in this community 
            </div>
          )}
          <div className="bg-gray-100 h-[580px] overflow-y-auto p-4 rounded-lg">
            <ComunityPostList posts={posts} postId={postId} />
          </div>
          {/* <CommunityMessageInput communityId={comunityId} /> */}
          <Message communityId={comunityId!} />
        </div>
        <ComunityUser communityId={comunityId} />
      </div>
    </div>
  );
};
export default Page;
