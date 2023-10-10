"use client";
import { SimplePost } from "@/model/Post";
import React from "react";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GirdSpinner from "./ui/GirdSpinner";

export default function PostList() {
  const {
    data: posts,
    error,
    isLoading: loading,
  } = useSWR<SimplePost[]>("/api/posts");
  console.log(posts, "POST");

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GirdSpinner />
          {/* girdspinner 가 받을 props 자체가 옵셔널로 되어있고 해당 컴포넌트에서 프롭에 대한 기본값을 설정했다면 프롭으로 값을 넘겨주지 않아도 됨  */}
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 리턴해준 데이터를 받아와서, 화면에 그려줌
