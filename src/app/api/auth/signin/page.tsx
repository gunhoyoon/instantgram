import React from "react";
import { getServerSession } from "next-auth";
import { handler } from "../[...nextauth]/route";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import Signin from "@/components/Signin";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
// nextjs가 url에 관한걸 props로 전달해주는데, 실질적으로 signin을 해주는 곳은 여기니까
// 여기에 callbackUrl이 전달될거고 그걸 받아서 signin 에 전달해줌
export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(handler);
  // getServerSession 함수를 호출하면 getServerSessionParams 중 하나를 전달해야하는데
  // 여기에 route.ts에서 정의한 handler이고, 여기엔 nextauth 에 필요한 옵션이 들어가있음
  // 현재 signin page 자체는 서버 컴포넌트임
  // 그래서 useSession 이 아니라 getServerSession 을 사용한거, getServerSession 은 서버측에서 세션 객체를 검색하기 때문임
  // 이 방법은 NextAuth.js를 데이터베이스와 함께 사용할 때 특히 유용하며, 서버 측에서 getSession 대신 사용하면 응답 시간을 크게 단축할 수 있음
  if (session) {
    redirect("/");
  }
  // 세션이 있다면 로그인 할 필요가 없으니 홈 경로로 리다이렉트 시켜줌

  // 세션에 대한 정보는 client 로부터 들어온 헤더 안에 있는데 페이지 요청이 들어올 때 마다 요청안에 세션이 있는지를 확인하고,
  // 그에 따른 페이지 제공(대응)을 하기 때문에 ssr 로 동작(12버전에서 getServerSideProps 사용)

  const providers = (await getProviders()) ?? {};
  // 왼쪽 피연산자가 null 이거나undefined 일 때 우측 반환
  // 현재 설정한 provider가 google뿐이니 해당 provider가 담고 있는 정보 반환
  // callbackurl은 google cloud에서 client id 발급받기 위해 설정한 url로 반환
  // 해당 providers 를 받아서 화면에 보여주고, 클릭 이벤트를 처리하려면 클라이언트 컴포넌트로 만들어야함
  console.log(providers, "providers");
  // 해당 providers 를 받아서 사용자에게 ui 를 받아주고 클릭 이벤트도 받고 하려면 클라이언트 컴포넌트가 필요함
  // 그래서 서버 컴포넌트안에 부분적으로 클라이언트를 만들어넣어야함
  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}

// 해당 페이지로 signin 페이지를 커스텀할 수 있게 route.ts에서 설정해뒀고, 이 페이지가 반환해주는건 signin 컴포넌트 인거임
