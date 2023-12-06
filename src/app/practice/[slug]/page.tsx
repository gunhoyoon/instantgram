"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
  searchParams: any;
};

// usePathname , useSearchParams (use client 명시)
export default function UserProfilePage({ params, searchParams }: Props) {
  // export default function UserProfilePage(props: Props) {
  console.log(params.slug, "username");

  const pathname = usePathname(); // 현재 url 쿼리 스트링 제외
  console.log(pathname, "pathname");

  const name = pathname.split("/");
  console.log(name[2]);
  // /user/rkdus5964 -> ["" , "user" , "rkdus5964"]
  // /user/rkdus5964/hello -> ["" , "user" , "rkdus5964" , "hello"]
  // const router = useRouter();
  // console.log(router, "router");
  // const searchParams = useSearchParams();
  console.log(searchParams); // return [26]
  // searchParams.get("a") 에 관련된 모든 값을 스트링으로 반환함
  // searchParams.getAll("a") 에 관련된 모든 값을 스트링 배열로 반환함
  console.log(name, "name");
  // path 값을 가져오게 된다면
  // { params: { slug: 'rkdus5964' }, searchParams: {} }
  return (
    <div>
      <h2 className="font-bold">
        안녕하세요!
        <span className="text-cyan-500"> {params.slug} </span>님 반갑습니다.
      </h2>
      {searchParams?.age && <p>회원님의 나이는 {searchParams.age}세 입니다.</p>}
    </div>
  );
}
// CSR 에서 값 들고오는거
// slug , 통해서
