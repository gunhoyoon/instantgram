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

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(handler);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};
  // 왼쪽 피연산자가 null 이거나 undefined 일 때 우측 반환
  // 해당 providers 를 받아서 사용자에게 ui 를 받아주고 클릭 이벤트도 받고 하려면 클라이언트 컴포넌트가 필요함
  // 그래서 서버 컴포넌트안에 부분적으로 클라이언트를 만들어넣어야함
  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
// 현재 signin page 자체는 서버 컴포넌트임
// 그래서 useSession 이 아니라 getServerSession 을 사용한거, getServerSession 은 서버측에서 세션 객체를 검색하기 때문임
// 이 방법은 NextAuth.js를 데이터베이스와 함께 사용할 때 특히 유용하며, 서버 측에서 getSession 대신 사용하면 응답 시간을 크게 단축할 수 있음
