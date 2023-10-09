"use client";
import { SimplePost } from "@/model/Post";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

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
          <GridLoader color="red" />
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
