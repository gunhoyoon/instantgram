"use client";
import { ProfileUser } from "@/model/User";
import React, { useState } from "react";
import useSWR from "swr";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: "liked", icon: <HeartIcon className="w-3 h-3" /> },
];

export default function UserPosts({ user: { username } }: Props) {
  // 어떤 탭이 눌렸냐에 따라 다른 데이터를 가져옴 ,(posts , bookmarks , likes)
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks

  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
