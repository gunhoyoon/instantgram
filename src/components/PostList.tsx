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

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GirdSpinner />
          {/* girdspinner 가 받을 props 자체가 옵셔널로 되어있고 해당 컴포넌트에서 프롭에 대한 기본값을 설정했다면 컴포넌트의 값을 넘겨주지 않아도 됨  */}
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-2">
              <PostListCard post={post} priority={index < 2} />
              {/* index < 2  ,  해당 조건의 결과값대로 true, false 가 나올 것이고 해당 값이 priority값으로 전달될것임 */}
              {/* 이렇게 전달되면 posts로 전달된 배열에 0 , 1 번째 인덱스의 이미지가 중요 컨텐츠로 간주되어, 최적화된 렌더링을 통해 사용자에게 빠르게 제공할 수 있다 */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 리턴해준 데이터를 받아와서, 화면에 그려줌
