import React, { useState } from "react";

type Props = {
  number: number;

  onIncrease: any;
  onDecrease: any;
};

export default function Counter({ number, onIncrease, onDecrease }: Props) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiff(parseInt(e.currentTarget.value));
    // parseint 의 기본 반ㄱ  환값이 10진수임
  };
  const [diff, setDiff] = useState(0);
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={() => onIncrease(diff)}>+</button>
        {/* <button onClick={()=>({onIncrease(diff)})}>+</button> */}
        <button onClick={() => onDecrease(diff)}>-</button>
        {/* <button onClick={onDecrease}>-</button> */}
      </div>
    </div>
  );
}

// 액션 내부 페이로드 리듀서 디스패치
// 뷰 쪽에서 사용
// todo
