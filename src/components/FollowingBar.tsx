"use client";
import React from "react";
import useSWR from "swr";

export default function FollowingBar() {
  const { data, error, isLoading } = useSWR("/api/me");
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 를 통해 사용자의 대한 정보를 가져옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity 에서 가지고 옴 (followings에 대한 )
  // 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
  // 그 아래에 (images, username) 보여줌
  console.log(data, error, isLoading);
  // 라이브러리를 사용하지 않고 만든다면 요청을 시작하면 isLoading 을 true 로 만들고
  // 응답이 온다면 isLoading을 false로 만들어주고, 요청의 무언가가 잘못됐다면, error을 던져주고 이런 처리를 다 해줘야하는데,
  // 내부 구현사항으로 인해 아주 간편하게 해결할 수 있다.
  return <div>FollowingBar</div>;
}
// fetcher 에 관한 정보를 매 api 요청 시 마다 하기 불편하니, SWRConfigContext 에 담아두고 전역으로 관리하는 layout의 main 부분을 감싸줌으로써
// main에 속하는 페이지들만 swr 요청 시 fetcher 선언을 별개로 하지 않고 사용
// 돌아가는건 알겠는데 api 내부의 코드를 어떤식으로 만들어서 값을 리턴하게 해야하는지에 대한 그림이 안 그려짐

// 기존 홈페이지에는 로그인한 user에 정보만 나와있었는데,
// 해당 페이지에서는 그 유저가 팔로잉한 유저 + 북마크 + 게시물까지 다 나와야하기 때문에
// sanity 쪽 데이터 접근이 필요함
// 클라이언트에서 백엔드에 api/me 라는 경로로 사용자의 정보를 받아옴.
