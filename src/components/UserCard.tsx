import { SearchUser } from "@/model/User";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, followers, following },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
    >
      {/* Link 태그를 사용하면 사용자에게 보여지는 순간 nextjs에서 prefetch 해옴 */}
      {/* 만약 prefetch 해오는게 불필요하다고 생각하면 일반 li태그에 click handler 로 처리해주면 됨   */}

      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p className="text-sm leading-4">{name}</p>
        {/* 삼항으로 처리 */}

        <p>
          {`${followers} followers ${following} following `}
          {/* 굳이 0을 생각해서 삼항으로 처리해주지 않아도 됨 어차피 없으면 0으로 나오겠구나 */}
          {/* {followers == null ? "0" : followers} */}
        </p>
      </div>
    </Link>
  );
}
