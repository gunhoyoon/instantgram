"use client";

import React from "react";
import Cpage from "./c/page";

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function Bpage({ value, setValue }: Props) {
  //   const data = ConsoleData();
  function onClick() {
    setValue((preValue) => preValue + 1);
  }
  console.log("B 페이지 렌더링 되었습니다.");
  return (
    <div>
      여기는 B page 입니다.
      <p>프롭으로 전달받은 값은 {value} 입니다 </p>
      <button onClick={onClick} className="bg-red-300">
        +1 button
      </button>
      <Cpage value={value} setValue={setValue} />
    </div>
  );
}
