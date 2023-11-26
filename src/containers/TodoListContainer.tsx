"use client";

import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { Store } from "@/model/type/todos";

import React from "react";
import { useSelector } from "react-redux";

export default function TodoListContainer() {
  const todos = useSelector(({ todos }: Store) => todos);
  // console.log(todos);

  // type A = typeof createTodo;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl">TodoList</h2>
      <AddTodo />
      <TodoList todos={todos} />
    </div>
  );
}
// 각 메서드 최하단으로 내려보기, 각 역할에 맞ㄱㅔ
