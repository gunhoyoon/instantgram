import { SimplePost } from "@/model/Post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import useFullPost from "@/hook/usePost";
import GirdSpinner from "./ui/GirdSpinner";

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
  // const { id, username, userImage, image } = post;
  // const { user } = useMe();
  // const { post: data, postComment } = useFullPost(id);
  // const comments = data?.comments;
  // const handlePostComment = (comment: string) => {
  //   user &&
  //     postComment({ comment, username: user.username, image: user.image });
  // };

  const { id, userImage, username, image } = post;
  const { post: data, postComment, isLoading } = useFullPost(id);
  const comments = data?.comments;
  // const handlePostComment = (comment: Comment) => {
  //   postComment(comment);
  // }; 전달받은 인자를 그대로 호출해서 postComment 로 바로 연결이 가능
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
          {isLoading && (
            <div className="text-center mt-4">
              <GirdSpinner />
            </div>
          )}
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
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
        <ActionBar post={post} onComment={postComment} />
        {/* actionBar의 text는 별개로 만들어줄거라서 지금 한번에 전달해주지 않을거임
        그로 인해 ActionBar 에서 옵셔널 처리했고, text가 전달되지 않았을 경우에 보여주지 않고
        전달됐을때만 보내주게 구현함 */}
      </div>
    </section>
  );
}

// commentform 컴포넌트 리팩토링 , Postdetail이나 listCard 나 코멘트를 작성하므로 각각의 commentform을 다 가지고 있고. 작성하는 로직을 위해 user/me 에 대한 확인이 항상 필요
// 액션바에는 useMe 도 사용하고 사용자관련 이벤트 (좋아요 , 북마크 ) 기능도 있으니 코멘트를 추가해줌으로써 이곳저곳에서 useMe 호출을 줄일 수 있음
// 근데 detail에서 사용하는 comment 는 string[] 이고, listcard 에서 사용하는 comment는 넘버임.
// 이걸 고민해봐야함
