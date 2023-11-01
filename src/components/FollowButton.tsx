"use client";
import { HomeUser, ProfileUser } from "@/model/User";
import React from "react";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");
  console.log(loggedInUser);
  console.log(username);
  const showButton = loggedInUser && loggedInUser.username !== username;
  // 로그인한 사용자가 나의 페이지를 직접 본다면 follow 버튼이 나오면 안됨
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  // 로그인한 사용자가 있고, 해당 사용자의 팔로잉 목록에 있는 username 이 현재 페이지에 있는 사람인지 확인
  const text = following ? "Unfollow" : "Follow";
  return (
    <div>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text == "Unfollow"} />
      )}
    </div>
  );
}
