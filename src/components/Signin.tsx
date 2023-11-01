"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import ColorButton from "./ui/ColorButton";

export type Props = {
  providers: Record<string, ClientSafeProvider>;
  // Record 타입엔 키와 벨류가 있는데, 벨류는 ClientSafeProvider
  // 키는 문자열, provider id , name 과 같은 문자열
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  // provider는 기껏해야 우리가 nextauth 설정에 로그인할 provider를 설정한 데이터를 담은 객체임
  // 그 객체 자체를 배열로 반환해주는 Object.values를 거쳐 맵돌려서 뿌려줌
  console.log(callbackUrl, "callbackUrl");
  return (
    <>
      {Object.values(providers).map(({ id, name }) => (
        <ColorButton
          key={id}
          text={`Sign In with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          // Signin 시 어떤 프로바이더로 로그인 할거인지에 대한 id 전달
          // callbackurl은 signin의 options? = 객체 형태로 전달해줘야함, callbackUrl 키 벨류 동일
          size="big"
        />
      ))}
    </>
  );
}

// 아 그냥 기존 nextauth에서 제공하는 signin으로 로그인을 하게되면
// 서버사이드에서 동작함. 그래서 로그인에 관한 예외처리를 해주고 싶다면
// session이 있는 경우. 즉 로그인이 되어있는 경우만 redirect 처리를 해주면 되는데
// 지금 프로젝트에선 signin 페이지 자체를 커스텀 페이지로 만들고 싶으니. 결국 버튼을 클릭해서 signin을 하게되는 페이지를 만들어야하는데
// 그러면 당연히 client component가 될것이고, provider에 대한 정보는 서버에 접근을 해서 가져와야하는데
// 클라이언트에선 접근하지못하므로 providers에 대한 데이터를 프롭으로 넘겨주고 있는 형태임
// 와 기껏해야 서버에서 데이터 받아서 뭐 클라이언트 주겠지 하던건데. 막상 못봄. .. . .
