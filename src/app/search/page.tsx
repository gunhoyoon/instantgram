import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";
// 스테틱하게 만들지않고 서버사이드로 요청 시 마다 처리할 수 있게 해줌
// ├ ○ /api/search   ├ ○ /search         -->  λ /api/search ├ λ /search
export const metadata: Metadata = {
  title: "User Search",
  description: "Search  users to follow",
};

export default function page() {
  return <UserSearch />;
}
