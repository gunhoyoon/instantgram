"use client";
import { SimplePost } from "@/model/Post";
import React, { useState } from "react";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import ModalPortal from "./ui/ModalPortal";
type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, createdAt, likes } = post;

  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar image={userImage} username={username} />
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
      <ActionBar post={post} />
      <CommentForm />
      {isOpenModal && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
// 모달창 일단 위에 띄움 이제 스타일 / 상세 페이지 구조.
// 근데 여기서 children 의 구조가
