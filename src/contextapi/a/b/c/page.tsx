"use client";
import { CountValue } from "@/context/DataContext";
import React from "react";

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};
export default function Cpage({ value, setValue }: Props) {
  const { value: count, setValue: setCount } = CountValue();

  console.log("C 페이지 렌더링 되었습니다.");
  function onClickContextAPI() {
    setCount((preValue) => preValue + 1);
  }
  function onClickProps() {
    setValue((preValue) => preValue + 1);
  }
  return (
    <div>
      여긴 C page 입니다.
      <p>use context로 전달받은 값{count} 입니다</p>
      <button onClick={onClickContextAPI} className="bg-red-300">
        +1 Context API
      </button>
      <p>프롭으로 전달받은 값은 {value} 입니다</p>
      <button onClick={onClickProps} className="bg-blue-300">
        +1 Props
      </button>
    </div>
  );
}

// 현재 context api 만들어서 a/b/c 구조에서 c 에 직접 전달하고 해당 값을 바꿨는데 c만 렌더링 되는 모습
