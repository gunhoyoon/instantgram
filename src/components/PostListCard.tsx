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
  const { userImage, username, image, comments, text } = post; // type = simplePost , comment : number
  console.log(post, "post");

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
        priority={priority} // 이미지 높은 순위로 사전 로드 true 시
        onClick={() => setIsOpenModal(true)}
      />
      <ActionBar post={post}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className={`font-bold my-2 text-sky-500`}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {/* 해당 액션바와 PostDetail 안에서의 액션바가 같지만 comment 가 보여질 땐 리스트에선 숫자로, 디테일에서는 스트링 배열로 보여줄거임
      이걸 어떤식으로 전달해야될까  , , */}
      {/* 액션바 내부에서 칠드런을 받고 (옵셔널) 해당 칠드런으로는 코맨트 개수에 따른 ui 새팅, 리스트에선 사용, 디테일에선 사용 안함(옵셔널 사용 이유) */}
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
