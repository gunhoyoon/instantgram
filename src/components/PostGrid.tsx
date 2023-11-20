import React from "react";
import useSWR from "swr";
import GirdSpinner from "./ui/GirdSpinner";
import { SimplePost } from "@/model/Post";
import PostGridCard from "./PostGridCard";

type Props = {
  username: string;
  query: string;
};
export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);
  console.log(posts);
  return (
    <div className="w-full text-center">
      {isLoading && <GirdSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {/* 그리드 = 열 / 행으로 표현 시 주로 사용 */}
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
