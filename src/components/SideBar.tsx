import React from "react";
import Avatar from "./Avatar";
import { User } from "@/model/User";
import Link from "next/link";

type Props = {
  user: User;
};
// 모델링해놓은 user에 대한 타입 자체를 import 해와서 사용할 때, Props 으로 넘겨받은 user에 대한 정의를 해야하는데,
// 자꾸 Props 자체를 User 타입으로 정의하려고해서 헷갈림

export default function SideBar({ user }: Props) {
  return (
    <>
      <div className="flex items-center">
        {user?.image && (
          <Link href={`/user/${user.username}`}>
            <Avatar image={user?.image} highlight />
          </Link>
        )}
        <div className="ml-4">
          <p className="font-bold">{user?.username}</p>
          <p className="text-lg text-neutral-500 leading-4">{user?.name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About﹒Help﹒Press﹒API﹒Jobs﹒Privacy﹒Terms﹒Location﹒Language
      </p>
      <p>@Copyright INSTANTGRAM from METAL</p>
    </>
  );
}
// AuthContext 를 통해 sessionProvider 를 제공하고 client 컴포넌트를 감싸고 있기 때문에, useSession 으로 세선 정보 접근 가능
// 같은 컴포넌트를 쓰는데 화면이 다르게 어캐함
// 서버 컴포넌트. 페이지에서 이미 알고 있는 user를 props 으로 전달해주면 props에 맞게 해당 페이지를 보여주기만 하는 100% 정적인 페이지임
