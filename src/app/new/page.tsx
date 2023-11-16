"use client";
import { useLoginStateContext } from "@/context/LoginContext";
import Link from "next/link";

import React from "react";

export default function NewPage() {
  const data = useLoginStateContext();

  console.log(data?.isLogin);

  const LoginToggleButton = () => {
    if (data?.isLogin) {
      alert("로그아웃 되었습니다.");
      data?.setIsLogin(false);
    } else {
      alert("로그인 되었습니다.");
      data?.setIsLogin(true);
    }
  };

  return (
    <div className="flex flex-col">
      <Link href={"/new/main3"}>Main3</Link>
      <button onClick={() => LoginToggleButton()}>
        {data?.isLogin ? "Logout" : "Login"}
      </button>
    </div>
  );
}

// 로그인 아닌 상태에서 붉은 메뉴 접근시, 로그인 페이지로 리다이렉트 됩니다. 현재 path 값을 담은 채로
// 로그인 페이지에서는 만약 서치파람 값에 callbackUrl이 있다면 로그인 성공처리 이후, 해당 url로 리다이렉트 시켜줍니다.

// 글로벌 스테이트로 로그인을 했는지에 대한 정보 필요,
// main3 컴포넌트에 로그인에 대한 상태 전달해서, 받는 쪽에서 로그인이 안되어있을시 router.push() 사용해서 /login + ?callbakcUrl=${현재 path값} (서치파람 전달)
// 로그인 페이지에선 리다이렉트 될 때 전달받은 서치 파람값이 있다면 , rotuer.push(서치파람) 값 뽑아서 경로로 사용해서 보내줌
// 그럼 main3 페이지에서 isLogin=true 받고 해당 화면 나옴
