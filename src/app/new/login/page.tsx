"use client";
import { useLoginStateContext } from "@/context/LoginContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  console.log(router);
  const data = useLoginStateContext();
  const searchParams = useSearchParams();
  console.log(searchParams.get("callbackUrl"), "searchParams");

  const LoginButton = () => {
    data?.setIsLogin(true);

    const callbackUrl = searchParams.get("callbackUrl");
    console.log(callbackUrl, "callbackUrl");
    const hasCallbackUrl = callbackUrl !== "/";
    console.log(hasCallbackUrl, "hasCallbackUrl");
    const callbackUrlCase = !data?.isLogin && hasCallbackUrl;
    console.log(callbackUrlCase, "callbackUrlCas");

    if (callbackUrlCase) {
      router.push(`/new/${callbackUrl}`);
    } else {
      // console.log(data?.isLogin);
      router.push(`/new`);
    }
  };

  // 로그인 버튼을 눌렀을 때 로그인이 되어있고 콜백 url이 있다면 , 콜백 유알엘로 보내준다.
  // 로그인 버튼을 눌렀는데 로그인이 되어있고 콜백 url이 없으면 메인으로 보내준다.

  // useEffect(() => {
  //   data?.setIsLogin(true);
  // }, [data?.isLogin]);
  return <button onClick={LoginButton}>Login</button>;
}
// if (searchParams.get("callbackUrl") == "/") {
//   router.push(`/new`);
// } else {
//   router.push(`/new/${searchParams.get("callbackUrl")}`);
// }
// if (searchParams && data?.isLogin) {
//   router.push(`${searchParams.get("callbackUrl")}`);
// }

// console.log(searchParams.get("callbackUrl"), "searchParams");

// main3 페이지에 접근할 시 isLogin 확인해서 로그인 됐다면 해당 페이지가 보여지고,
// 아니라면 로그인 페이지로 push =  푸시할 때 콜백 url 담에서 보내줌ㅡ 어차피 login페이지에선 searchParams 에 값이 담겨서 들어올태니
// 서치 파람이 있으면 해당 url 로 보내주면 됨
