"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

// 해당 컨텍스트는 로그인한 사용자의 정보를 가지고 있는 우산이 될 것임
// 해당 컴포넌트가 가지고 있는 사용자 정보를 하위 컴포넌트들에게 전달해주기 위해 sessionprovider 로 감싸줄거임
