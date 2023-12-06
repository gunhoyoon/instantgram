"use client";
import { ProfileUser } from "@/model/User";
import React, { useState } from "react";
import useSWR from "swr";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

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

  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon }) => (
          <li
            className={`mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        // 기본적인 postsKeys 는 api/posts 로 설정되어있고, Provider 로 감싸주고 value 자체로 다른 postsKeys 를 넘겨주지 않는 이상
        // postsKeys는 api/posts 가 될 것임 , PostGrid 의 경우 해당
        // 해당 컨텍스트로 감싸준 컴포넌트들은 postsKeys 값을 `/api/users/${username}/${query}` 얘로 전달받을거임
        // 기본은 api/posts
        value={{ postsKeys: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
