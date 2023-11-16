"use client";
import React, { useState } from "react";

type Props = {
  addTodo: any;
  done: boolean;
};

export default function AddTodo({ addTodo, done }: Props) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("클릭됨");
    console.log(text);
    setText("");
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }
  const [text, setText] = useState("");

  return (
    <form className="flex mb-2" onSubmit={onSubmit}>
      <input
        type="text"
        value={text}
        onChange={onChange}
        placeholder="할 일을 입력하십셔"
        className="outline-none p-2 rounded-lg mr-2"
      />
      <button onClick={() => addTodo(text, done)}>ADD</button>
    </form>
  );
}

// 인풋에 텍스트가 입력 안되어있으면 버튼 disabled
