import { SimplePost } from "@/model/Post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, text, createdAt, likes } = post;
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        {/* 글 쓴 사람의 이미지 = userImage , 해당 글에 올린 이미지 = image */}
        <Avatar image={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        // aspect-ratio: 1 / 1; 가로 세로 비율 1 : 1 을 나타냄
        src={image}
        alt={`photo By ${username}`}
        height={500}
        width={500}
      />
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center border-t border-neutral-300 ">
          <SmileIcon />
          <input
            className="w-full ml-2 p-3 border-none outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button className="font-bold text-sky-500 ml-2" type="button">
            Post
          </button>
        </form>
      </div>
    </article>
  );
}
