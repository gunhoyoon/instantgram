import React, { useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0; // 조건에 따른 t f 값이 반환될 것.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서밋이 되면 해당 포스트에 코멘트를 추가해달라는 요청을 보내야함 , 여기서부터 시작임
    // 하지만 여기선 post의 대한 데이터가 없고 요청을 따로 하지도 않음 때문에 내부적으로 요청을 하지 않고
    // 코멘트가 처리 될 때 해당 코맨트를 처리할 수 있는 함수를 props 으로 받을거임
    // 지금 하고 있는게 클라이언트 자체로도 업데이트를 하게 되는거고, 서버에 요청까지해서 데이터를 맞춰줄 수 있게 되는거임
    // 코맨트를 입력해서 보내주면 코맨트를 추가하고, 추가하게 되면 전체 포스트가 업데이트 되면서 코맨트 정보가 업데이트 되어야함
    console.log(comment);
    onPostComment(comment);

    setComment("");
  };
  // onPostComment 함수에 코맨트를 담아서 postListcard -> postComment 함수에 comment 를 넣어줌
  // 해당 컴포넌트에서 가지고 있는 post 데이터와 , comment를 받은 postComment 함수가 실행됨
  // usePosts 훅 > postComment 실행 되면서 받은 post , comment 를 가지고 얕은 복사 후 comments 의 +1 증가한 newPost 생성
  // 코맨트가 추가된 post -> post.id 와 전달받은 comment 넣어주고 addComment 실행 - 여기서 api/comments , POST 찌르고 페이로드 id , comment 넣어줌
  //
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-neutral-300 px-3"
    >
      <SmileIcon />
      <input
        className="w-full ml-2 p-3 border-none outline-none"
        type="text"
        value={comment}
        required
        placeholder="Add a comment..."
        onChange={(e) => {
          setComment(e.currentTarget.value);
        }}
      />
      {/* currentTarget , target / 이벤트 버블링의 차이 , currentTarget : 이벤트 핸들러가 바인딩된 요소의 값이 됨
       target : 중첩된 요소에서 이벤트가 발생할 경우  */}
      <button
        className={`font-bold  ml-2 ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
        type="button"
        disabled={buttonDisabled}
      >
        Post
      </button>
    </form>
  );
}
// 입력폼 재사용
