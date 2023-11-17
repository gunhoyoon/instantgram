"use client";

import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { addTodo } from "@/modules/todos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoListContainer() {
  const todos = useSelector((state: any) => state.todos);
  console.log(todos);
  const dispatch = useDispatch();

  const createTodo = (text: string) => {
    dispatch(addTodo(text));
  };
  // type A = typeof createTodo;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl">TodoList</h2>
      <AddTodo addTodo={createTodo} />
      <TodoList todos={todos} />
    </div>
  );
}
// 각 메서드 최하단으로 내려보기, 각 역할에 맞ㄱㅔ
