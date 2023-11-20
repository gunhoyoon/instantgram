import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};
const getUser = cache(async (username: string) => getUserForProfile(username));
// 해당 페이지를 서버사이드 렌더링을 통해 만들 때 페이지 내부와 해당 페이지의 메타데이터에서 데이터 요청을 두번하게 되므로, 해당 요청값을 캐시해서 사용할거임
// 서버 컴포넌트에서 사용가능 / 데이터를 요청하는거니까 서버에
export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);
  if (!user) {
    notFound(); //next js 에서 제공하는 notFound 호출. 하면 동일 경로에 있는 notFound로 이동
  }
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) ﹒ Instantgram Photos`,
    description: `${user?.name}' s all Instantgram posts`,
  };
}
