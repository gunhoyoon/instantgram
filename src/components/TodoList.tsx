"use client";
import React, { useState } from "react";

type Props = {
  todos: any;
  modifyTodo: any;
  removeTodo: any;
  toggleTodo: any;
};

export default function TodoList({
  todos,
  modifyTodo,
  removeTodo,
  toggleTodo,
}: Props) {
  //   console.log(todos, "todostodos");

  return (
    <ul className="w-80">
      {todos.map((todo: any) => (
        <li key={todo.id} className="flex gap-2">
          <input type="checkbox" onChange={() => toggleTodo(todo.id)} />
          <span className={`${todo.done ? "line-through" : ""}`}>
            {todo.text}
          </span>
          <button
            className={`${todo.done ? "" : "text-gray-500"}`}
            disabled={todo.done ? false : true}
            onClick={() => removeTodo(todo.id)}
          >
            삭제하기
          </button>
        </li>
      ))}
    </ul>
  );
}
// todo id 가 action.payload.id 와 다르면
