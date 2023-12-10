import React from "react";

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  title: string;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  title,
}: Props) {
  return (
    <button aria-label={title} onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
// 이렇게 만든 프롭을 전달해주게 되면 toggled 에 넣어준 각 스테이트가 함수 인자로 들어가게 됨
