"use client";
import { SimplePost } from "@/model/Post";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/\bModalPortal";
import { MdCancel } from "react-icons/MD";
import PostModal from "./PostModal";
type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, createdAt, likes } = post;
  const [isOpenModal, setIsOpenModal] = useState(false);
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
        priority={priority}
        onClick={() => setIsOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        text={text}
        createdAt={createdAt}
        username={username}
      />
      <CommentForm />
      {isOpenModal && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpenModal(false)}>
            <div>포탈입니다 개꿀</div>
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
// 모달창 일단 위에 띄움 이제 스타일 / 상세 페이지 구조.
