"use client";
import { addTodo } from "@/modules/todos";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const [text, setText] = useState(""); // 배치
  const dispatch = useDispatch();

  const createTodo: (text: string) => void = (text: string) => {
    dispatch(addTodo(text));
  };

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("클릭됨");
    // console.log(text);
    setText("");
  }
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }

  return (
    <form className="flex mb-2" onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={text}
        onChange={onChangeHandler}
        placeholder="할 일을 입력하십셔"
        className="outline-none p-2 rounded-lg mr-2"
      />
      <button
        onClick={() => createTodo(text)}
        // 액션이 디스패치된 모습
        disabled={text.length < 1 ? true : false}
      >
        ADD
      </button>
    </form>
  );
}

// 인풋에 텍스트가 입력 안되어있으면 버튼 disabled
