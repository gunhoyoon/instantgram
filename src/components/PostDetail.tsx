import { SimplePost } from "@/model/Post";
import React from "react";
import Avatar from "./Avatar";
import useSWR from "swr";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
};
type Comment = {
  image: string;
  username: string;
  comment: string;
};
// 기존 SimplePost 의 타입을 그대로 가져오지만 해당 타입은 comment 가 number타입을 사용중이기 때문에
// 상세 페이지에 넘어와서는 해당 데이터를 스트링 배열의 타입으로 가져와야하는데, 프롭으로 post 의 대부분을 넘겨주는 곳에서 이미 simplePost 로 받아버렸기 때문에,,
// 여기서 comment의 데이터를 따로 받아오고 해당 comment의 타입을 별개로 선언해줄 필요가 있음
// Comment는 상세 페이지로 넘어갈 때 나오기 때문에 해당 게시물의 id별로 api 요청을 하고, 해당 경로로 요청한 comment data를 받아옴
export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, text, createdAt, likes } = post;
  const { data } = useSWR(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="   object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
          // 650px 정도로 너비를 가져가되, 높이는 fill해줘(position의 속성이 들어간 부모의 높이만큼 가져줘)
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments?.map(
              (
                { image, username: commentUsername, comment }: Comment,
                index: number
              ) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={username === commentUsername}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        {/* actionBar의 text는 별개로 만들어줄거라서 지금 한번에 전달해주지 않을거임
        그로 인해 ActionBar 에서 옵셔널 처리했고, text가 전달되지 않았을 경우에 보여주지 않고
        전달됐을때만 보내주게 구현함 */}
        <CommentForm />
      </div>
    </section>
  );
}
