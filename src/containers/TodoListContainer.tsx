"use client";

import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { addTodo, modifyTodo, removeTodo, toggleTodo } from "@/modules/todos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoListContainer() {
  const todos = useSelector((state: any) => state.todos);
  console.log(todos);
  const dispatch = useDispatch();

  const createTodo = (text: string, done: boolean) =>
    dispatch(addTodo(text, done));
  const changeTodo = (text: string) => dispatch(modifyTodo(text));

  const deleteTodo = (id: number) => dispatch(removeTodo(id));

  const toggleCompletionTodo = (id: number) => dispatch(toggleTodo(id));
  //   console.log(todos, "todostodos");

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl">TodoList</h2>
      <AddTodo addTodo={createTodo} done={false} />
      <TodoList
        todos={todos}
        modifyTodo={changeTodo}
        removeTodo={deleteTodo}
        toggleTodo={toggleCompletionTodo}
      />
    </div>
  );
}
