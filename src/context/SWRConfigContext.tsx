"use client";

import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        // axios 를 사용하거나 react query 를 사용하거나 fetch를 사용하거나
      }}
    >
      {children}
    </SWRConfig>
  );
}
// fetcher 를 매번 작성하기 번거로우니, 하나 설정해두고 계속 사용가능.
// AuthContext 로 user에 관한 정보나, 로그인 / 아웃을 클라이언트에 제공하듯이
// 해당 SWRConfig도 context 개념으로 작성해 api 요청에 관한 응답을 할 수 있게 함 / client 컴포넌트내에서 사용이며
// layout 컴포넌트 안에 있는 children 컴포넌트만 감싸놨음
// 내일 시작하자마자 이 해당 로직을 영상보고 정리하고, 이걸로 인해서 더 뭘 할 수 있는지,
// 재사용 가능하게 만들어서 해당 유저의 id 를 가지고 같은 ui를 뿌려줄 수 있는?  그런거 관련 생각
