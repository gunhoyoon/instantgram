import React from "react";
import { AnyAction, Dispatch } from "redux";

type Props = {
  number: number;
  onIncrease: Dispatch<AnyAction>;
  onDecrease: Dispatch<AnyAction>;
};

export default function Counter({ number, onIncrease, onDecrease }: Props) {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={() => onIncrease()}>+</button>
        {/* <button onClick={()=>({onIncrease(diff)})}>+</button> */}
        <button onClick={() => onDecrease()}>-</button>
        {/* <button onClick={onDecrease}>-</button> */}
      </div>
    </div>
  );
}
