"use client";
import Counter from "@/components/counter";
import { decreaseAsync, increaseAsync } from "@/modules/counter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

type State = { counter: number };

export default function CounterContainer() {
  const number = useSelector((state: State) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}
// 이런식으로 컴포넌트에 관련된 함수만 넘겨주기
