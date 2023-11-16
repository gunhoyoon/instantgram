"use client";
import Counter from "@/components/counter";
import { decrease, increase } from "@/modules/counter";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CounterContainer() {
  const { number } = useSelector((state: any) => ({
    number: state.counter.number,
  }));
  const dispatch = useDispatch();

  const onIncrease = (n: number) => dispatch(increase(n));
  const onDecrease = (n: number) => dispatch(decrease(n));

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}
// 이런식으로 컴포넌트에 관련된 함수만 넘겨주기
