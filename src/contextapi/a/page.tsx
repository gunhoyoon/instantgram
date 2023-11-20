"use client";
import React, { useState } from "react";
import Bpage from "./b/page";

export default function Apage() {
  const [value, setValue] = useState(1);
  console.log("A 페이지 렌더링 되었습니다.");

  const handleIncrement = () => {
    setValue(value + 1);
  };
  return (
    <>
      <p>Props : {value}</p>
      <Bpage value={value} setValue={handleIncrement} />
    </>
  );
}

// set 함수를 전달하는게 아닌 set 함수를 지지고 볶고 하는 함수를 만들어서 보내는거임
