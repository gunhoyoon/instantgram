import { SimplePost } from "@/model/Post";
import Image from "next/image";
import React, { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { image, username } = post;
  return (
    <div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {/* fill = 이미지가 상위요소를 채우도록 하는거 한 마디로 꽉 채우겟다 div 만큼 */}
      {isOpenModal && (
        <ModalPortal>
          <PostModal onClose={() => setIsOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
