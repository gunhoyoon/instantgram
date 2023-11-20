"use client";
import { Todo } from "@/model/type/todos";
import { modifyTodo, removeTodo, toggleTodo } from "@/modules/todos";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");

  const changeTodo = (id: number, text: string) => {
    dispatch(modifyTodo(id, text));
  };
  // type B = typeof changeTodo;
  const deleteTodo = (id: number) => dispatch(removeTodo(id));
  // type C = typeof deleteTodo;
  const toggleCompletionTodo = (id: number) => dispatch(toggleTodo(id));

  const EditHandler = () => {
    setIsEdit(true);
  };
  const CancleEdit = () => {
    setIsEdit(false);
  };
  const changeTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const EditDone = () => {
    changeTodo(todo.id, text);
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit ? (
        <>
          <input
            type="checkbox"
            onChange={() => toggleCompletionTodo(todo.id)}
          />
          <span className={`${todo.done ? "line-through" : ""}`}>
            {todo.text}
          </span>
          <button
            className={`${todo.done ? "" : "text-gray-500"}`}
            disabled={todo.done ? false : true}
            onClick={() => deleteTodo(todo.id)}
          >
            삭제하기
          </button>
          <button onClick={EditHandler}>수정하기</button>
        </>
      ) : (
        <>
          <input
            type="text"
            defaultValue={todo.text}
            onChange={changeTodoHandler}
          />
          <button onClick={EditDone}>수정</button>
          <button onClick={CancleEdit}>취소</button>
        </>
      )}
    </>
  );
}
