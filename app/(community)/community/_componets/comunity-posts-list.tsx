"use client";
import { getPostsInCommunity } from "@/actions/community/get-posts-comunity-id";
import React from "react";
import ComunityPostItem from "./comunity-post-items";
import CommunityMessageInput from "./comunity-message-input";
import MessageReply from "./message-reply";

interface ComunityPostListProps {
  posts: Awaited<ReturnType<typeof getPostsInCommunity>>;
  postId?: string;
}
export default function ComunityPostList({
  posts,
  postId,
}: ComunityPostListProps) {
  const [posttoreply, setPostToReply] = React.useState<string | null>(null);
  return (
    <>
      <div className="flex flex-col ">
        {postId &&
          posts.map((post) => (
            <div key={post.id}>
              {post.id === postId && (
                <ComunityPostItem
                  post={post}
                  onchange={() => setPostToReply(post.id)}
                  postId={postId}
                />
              )}
            </div>
          ))}

        {posts.map((post) => (
          <div key={post.id}>
            {post.id !== postId && (
              <ComunityPostItem
                post={post}
                onchange={() => setPostToReply(post.id)}
                postId={postId}
              />
            )}
            {posttoreply === post.id && (
              <div className="ml-8">
                <MessageReply
                  communityId={post.communityId}
                  posttoreply={post.id}
                  onclicke={() => setPostToReply(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
