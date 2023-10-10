import React from "react";
import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center border-t border-neutral-300 px-3">
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
  );
}
// 입력폼 재사용
