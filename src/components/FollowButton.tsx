"use client";
import { ProfileUser } from "@/model/User";
import React, { useState, useTransition } from "react";
import Button from "./ui/Button";
import useMe from "@/hook/useMe";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching; // if 데이터 받아오는 중이라면.

  const showButton = loggedInUser && loggedInUser.username !== username;
  // 로그인한 사용자가 나의 페이지를 직접 본다면 follow 버튼이 나오면 안됨
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  // 로그인한 사용자가 있고, 해당 사용자의 팔로잉 목록에 있는 username 이 현재 페이지에 있는 사람인지 확인
  const text = following ? "Unfollow" : "Follow";
  const handleFollow = async () => {
    setIsFetching(true); // handleFollow 함수가 시작하면 , 패칭 트루 넣어주고
    await toggleFollow(user.id, !following); // 비동기함수니까 toggleFollow 끝날 때 까지 기다렸다가,
    setIsFetching(false); // 끝나면 false 넣어주고,
    startTransition(() => {
      router.refresh(); // isPending true
    });
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text == "Unfollow"}
          />
          {/* 버튼 컴포넌트에 onClick 이라는 이름으로 함수를 전달함 */}
        </div>
      )}
    </>
  );
}
