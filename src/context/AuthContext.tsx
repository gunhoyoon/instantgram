"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
// 얘가 어떻게 로그인한 사용자의 대한 정보를 가지고 있냐? 그건 next oauth 에서 제공하는 sesstion Provider 가 해줄거임
// 해당 컴포넌트가 가지고 있는 사용자 정보를 하위 컴포넌트들에게 전달해주기 위해 sessionprovider 로 감싸줄거임
// 기존에 리액트에서 사용하는 방법과 다르지 않음.
// context 자체가 상태를 가지고 있기 때문에, client 컴포넌트에서만 사용이 가능함.
// 해딩 컨텍스트로 감싸진 컴포넌트들은 client 컴포넌트.

// 이 방법은 데이터베이스와 함께 NextAuth.js를 사용할 때 특히 유용합니다.
// 이 방법은 일반적으로 Next.js에서 권장하지 않는 API 라우트에 대한 추가적인 가져오기를 피하므로
// 서버 측에서 getSession 대비 응답 시간을 크게 줄일 수 있습니다.
