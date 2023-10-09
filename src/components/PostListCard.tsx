import { SimplePost } from "@/model/Post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { id, userImage, username, image, text, createdAt, likes, comments } =
    post;
  return (
    <>
      <div>
        {/* 글 쓴 사람의 이미지 = userImage , 해당 글에 올린 이미지 = image */}
        <Avatar image={userImage} highlight />
        <span>{username}</span>
        <Image
          src={image}
          alt={`photo By ${username}`}
          height={500}
          width={500}
        />
      </div>
      <div>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
      </div>
    </>
  );
}
