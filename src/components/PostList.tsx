"use client";
import { SimplePost } from "@/model/Post";
import React from "react";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./PostListCard";

export default function PostList() {
  const { data: posts, error, isLoading } = useSWR<SimplePost[]>("/api/posts");
  console.log(posts, "POST");

  return (
    <section>
      {isLoading && (
        <div>
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 리턴해준 데이터를 받아와서, 화면에 그려줌
