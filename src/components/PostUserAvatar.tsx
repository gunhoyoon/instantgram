import React from "react";
import Avatar from "./Avatar";

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      {/* 글 쓴 사람의 이미지 = userImage , 해당 글에 올린 이미지 = image */}
      <Avatar image={image} size="medium" highlight />
      <span className="text-gray-900 font-bold ml-2">
        {username}대충 커밋추가했음
      </span>
    </div>
  );
}
