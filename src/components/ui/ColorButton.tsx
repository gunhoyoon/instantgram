import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "big";
  // 타입 옵셔널로 주는거
};

export default function ColorButton({ text, onClick, size = "small" }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 
    ${size === "big" ? "p-[0.3rem]" : "p-[0.15rem]"}`}
    >
      <button
        onClick={onClick}
        className={`bg-white rounded-sm text-base  hover:opacity-90 transition-opacity first-letter:
        ${size === "big" ? "p-4 text-2xl" : "p-[0.3rem] text-base"}`}
      >
        {text}
      </button>
    </div>
  );
}
