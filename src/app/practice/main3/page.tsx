"use client";
import { useLoginStateContext } from "@/context/LoginContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MainTestPage() {
  const data = useLoginStateContext();
  console.log(data);

  const pathname = usePathname().split("/");
  const path = pathname[2];
  const route = useRouter();

  useEffect(() => {
    if (data?.isLogin === false) {
      console.log(`/practice/login?callbackUrl=${path}`);
      route.push(`/practice/login?callbackUrl=/${path}`);
    }
  }, []);

  // const router = useRouter();
  // const pathname = usePathname();
  // console.log(pathname, "123123");
  // console.log(router);
  // console.log(isLogin);

  // if (!isLogin) {
  //   router.push(`/new/login?callbackUrl=${pathname}`);
  // }
  return (
    <div>
      main3 페이지 입니다!
      {data?.isLogin && <p>로그인 하셨군요 !</p>}
    </div>
  );
}
