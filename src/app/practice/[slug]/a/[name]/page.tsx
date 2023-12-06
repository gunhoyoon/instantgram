import React from "react";

type Props = {
  params: {
    name: string;
  };
};

export default function page({ params: { name } }: Props) {
  return <div>{name} page</div>;
}
//  a/[name] 어떠한 값을 받아와서 a 페이지에서 보여지는거처럼 보임
