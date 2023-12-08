"use client";
import Avatar from "@/components/Avatar";
import GirdSpinner from "@/components/ui/GirdSpinner";
import useDebounce from "@/hook/useDebounce";
import { SearchUser } from "@/model/User";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  // 디바운싱된 결과는 일정 시간동안 keyword 값이 입력 될 때 마다 기존 디바운싱 타이머를 클리어하고 새 타이머발행
  // 그 값을 debouncedKeyword 에 쏙 전달해줌
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
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
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 border border-gray-400 outline-none"
          type="text"
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a username or name"
        />
      </form>
      {error && <p>무언가가 잘못 되었음</p>}

      {loading && <GirdSpinner />}
      {!loading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username} className="flex">
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}

// 서치 페이지
// 1 . 입력 폼
// 2 . 아무것도 검색하지 않으면 전체 사용자.
// 3 . 사용자 아바타 , username , name following , followers
// 클릭 시 해당 userpage
