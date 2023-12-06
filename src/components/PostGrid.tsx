import React from "react";
import GirdSpinner from "./ui/GirdSpinner";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hook/usePosts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();
  console.log(usePosts, "usePosts");

  // console.log(posts, "PostGrid");

  return (
    <div className="w-full text-center">
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {/* 그리드 = 열 / 행으로 표현 시 주로 사용 */}
        {isLoading && <GirdSpinner />}
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
