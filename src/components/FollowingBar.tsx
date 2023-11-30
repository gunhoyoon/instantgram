"use client";
import React from "react";
import useSWR from "swr";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import { HomeUser } from "@/model/User";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import useMe from "@/hook/useMe";

// interface FollowingItem {
//   username: string;
//   image: string;
// }
// 놓친 것 1. following 맵 > 요소 하나씩의 타입 정의
// 놓친 것 2. 내부 요소 username , image  타입 정의
// 놓친 것 3. nextjs 클라이언트 요소 async await 사용 x , 따라서 옵셔널 처리로 데이터가 있을 때까지 기다렸다가 받아오는 처리.(ex) data?.following;

// 클라이언트 컴포넌트 비동기 요소(async , await) X
export default function FollowingBar() {
  const { user, error, isLoading } = useMe();
  // api/me에 정의해놓은 data 를 가지고 올거고 해당 데이터의 타입은 DetailUser야. 이렇게하면 자동완성이 됨. 우리 코드도 예상이 가능해짐
  // 타입으로 인해 예상이 가능해짐

  const users = user?.following;

  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 를 통해 사용자의 대한 정보를 가져옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity 에서 가지고 옴 (followings에 대한 )
  // 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
  // 그 아래에 (images, username) 보여줌

  // 라이브러리를 사용하지 않고 만든다면 요청을 시작하면 isLoading 을 true 로 만들고
  // 응답이 온다면 isLoading을 false로 만들어주고, 요청의 무언가가 잘못됐다면, error을 던져주고 이런 처리를 다 해줘야하는데,
  // 내부 구현사항으로 인해 아주 간편하게 해결할 수 있다.
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users?.length === 0) && <p>{`You don't have following`}</p>
      )}

      {users && users?.length > 0 && (
        <ScrollableBar>
          {users?.map(({ username, image }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center  text-ellipsis overflow-hidden">
                {username}
              </p>
              {/* username이 길 경우 text-ellipsis overflow-hidden 처리, 부모의 너비에 한계 + P 태그 자체에도 너비가 정해져야함 */}
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
// fetcher 에 관한 정보를 매 api 요청 시 마다 하기 불편하니, SWRConfigContext 에 담아두고 전역으로 관리하는 layout의 main 부분을 감싸줌으로써
// main에 속하는 페이지들만 swr 요청 시 fetcher 선언을 별개로 하지 않고 사용
// 돌아가는건 알겠는데 api 내부의 코드를 어떤식으로 만들어서 값을 리턴하게 해야하는지에 대한 그림이 안 그려짐

// 기존 홈페이지에는 로그인한 user에 정보만 나와있었는데,
// 해당 페이지에서는 그 유저가 팔로잉한 유저 + 북마크 + 게시물까지 다 나와야하기 때문에
// sanity 쪽 데이터 접근이 필요함
// 클라이언트에서 백엔드에 api/me 라는 경로로 사용자의 정보를 받아옴.

{
  /* <ul className="flex gap-4 justify-center">
{following ? (
  <ScrollableBar>
    {following?.map(({ username, image }: FollowingItem) => (
      <li key={username}>
        <Avatar image={image} highlight />
        <p>{username}</p>
      </li>
    ))}
  </ScrollableBar>
) : (
  "ㅇㅇ"
)}
{/* typeError (length) undefined, MultiCarousel 사용 시 안의 childrren 에 해당 정보가 확실하게 있는지에 대한 처리가 필요함
혹은 client / server 에서 접근할 수 있는 length 프로퍼티가 없을 수도 있는데 , 지금은 그게 아닌데 왜 안뜨는 걸까 . . . . */
}
// </ul>
