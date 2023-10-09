import getMyServerSessionData from "@/service/getMyServerSessionData";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getFollowingPostsOf } from "@/service/posts";

export async function GET() {
  const session = await getMyServerSessionData(authOptions);
  const user = session.session?.user;
  if (!user) {
    return new Response("Authentication Error!!", { status: 401 });
  }
  return getFollowingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}
// 세션에 유저네임으로 조회하기 위해서 만들어둔 함수에 username 전달해줌
// 그리고 성공적으로 받아와지면 파싱한걸 리턴해줌
// api 라우터에선 user에 대한 정보만 있는지를 확인한 뒤 id값만 넘겨주고 그 일을 서비스 로직에 맡길거, 함수 다 돌고 데이터 들어오면 그거 뱉어줌
