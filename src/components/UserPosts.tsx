"use client";
import { ProfileUser } from "@/model/User";
import React, { useState } from "react";
import useSWR from "swr";

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  // 어떤 탭이 눌렸냐에 따라 다른 데이터를 가져옴 ,(posts , bookmarks , likes)
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks

  const [tab, setTab] = useState("posts");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts);
  return <div></div>;
}
