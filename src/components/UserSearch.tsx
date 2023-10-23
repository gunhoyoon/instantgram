"use client";
import Avatar from "@/components/Avatar";
import GirdSpinner from "@/components/ui/GirdSpinner";
import useDebounce from "@/hook/useDebounce";
import { DetailUser, UserSearchResult } from "@/model/User";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<UserSearchResult[]>(`/api/search/${debouncedKeyword}`);
  //   const {
  //     data: users,
  //     error,
  //     isLoading: loading,
  //   } = useSWR<UserSearchResult[]>(`/api/search/${keyword}`);

  console.log(users, "users");

  // username , name , image, following , followers
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          className="border-none outline-none"
          type="text"
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a username or name"
        />
      </form>
      {loading && <GirdSpinner />}
      {users && (
        <ul>
          {users.map((user, index) => (
            <Link href={`/user/${user.username}`} key={index}>
              <li className="flex">
                <div>
                  <Avatar image={user.image} />
                </div>
                <div>
                  <p>{user.username}</p>
                  <p>{user.name}</p>
                  {/* 삼하응로 처리 */}

                  <span>
                    {user.followers == null ? "0" : user.followers}
                    {"followers"}
                  </span>
                  <span>
                    {user.following == null ? "0" : user.following}
                    {"following"}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </section>
  );
}

// 서치 페이지
// 1 . 입력 폼
// 2 . 아무것도 검색하지 않으면 전체 사용자.
// 3 . 사용자 아바타 , username , name following , followers
// 클릭 시 해당 userpage
