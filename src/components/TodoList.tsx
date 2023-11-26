"use client";
import { Todos } from "@/model/type/todos";
import React, { useState } from "react";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todos;
};

export default function TodoList({ todos }: Props) {
  // console.log(todos);
  return (
    <>
      <ul className="w-80">
        {todos.map((todo) => (
          <li key={todo.id} className="flex gap-2">
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
}
// todo id 가 action.payload.id 와 다르면
