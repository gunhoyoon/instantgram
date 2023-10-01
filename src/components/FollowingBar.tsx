"use client";
import React from "react";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR("/api/hello");
  console.log(data, error, isLoading);
  return <div>FollowingBar</div>;
}

// 기존 홈페이지에는 로그인한 user에 정보만 나와있었는데,
// 해당 페이지에서는 그 유저가 팔로잉한 유저 + 북마크 + 게시물까지 다 나와야하기 때문에
// sanity 쪽 데이터 접근이 필요함
// 클라이언트에서 백엔드에 api/me 라는 경로로 사용자의 정보를 받아옴.
